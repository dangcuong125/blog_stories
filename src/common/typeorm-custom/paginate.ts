import {
  IPaginationMeta,
  IPaginationOptions,
  Pagination,
  PaginationTypeEnum,
  TypeORMCacheType,
} from 'nestjs-typeorm-paginate';
import { SelectQueryBuilder } from 'typeorm';
import { createPaginationObject } from './create-pagination';

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

function resolveOptions(
  options: IPaginationOptions<any>,
): [number, number, string, PaginationTypeEnum, boolean, TypeORMCacheType] {
  const page = resolveNumericOption(options, 'page', DEFAULT_PAGE);
  const limit = resolveNumericOption(options, 'limit', DEFAULT_LIMIT);
  const route = options.route;
  const paginationType =
    options.paginationType || PaginationTypeEnum.LIMIT_AND_OFFSET;
  const countQueries =
    typeof options.countQueries !== 'undefined' ? options.countQueries : true;
  const cacheQueries = options.cacheQueries || false;

  return [page, limit, route, paginationType, countQueries, cacheQueries];
}

function resolveNumericOption(
  options: IPaginationOptions<any>,
  key: 'page' | 'limit',
  defaultValue: number,
): number {
  const value = options[key];
  const resolvedValue = Number(value);

  if (Number.isInteger(resolvedValue) && resolvedValue >= 0)
    return resolvedValue;

  console.warn(
    `Query parameter "${key}" with value "${value}" was resolved as "${resolvedValue}", please validate your query input! Falling back to default "${defaultValue}".`,
  );
  return defaultValue;
}

export async function paginate<T, CustomMetaType = IPaginationMeta>(
  queryBuilder: SelectQueryBuilder<T>,
  options: IPaginationOptions<CustomMetaType>,
): Promise<Pagination<T, CustomMetaType>> {
  const [page, limit, route, paginationType, countQueries, cacheOption] =
    resolveOptions(options);

  const promises: [Promise<T[]>, Promise<number> | undefined] = [
    queryBuilder
      .take(limit)
      .skip((page - 1) * limit)
      .cache(cacheOption)
      .getMany(),
    undefined,
  ];

  if (countQueries) {
    promises[1] = countQuery(queryBuilder, cacheOption);
  }

  const [items, total] = await Promise.all(promises);

  return createPaginationObject<T, CustomMetaType>({
    items,
    totalItems: total,
    currentPage: page,
    limit,
    route,
    metaTransformer: options.metaTransformer,
    routingLabels: options.routingLabels,
  });
}

const countQuery = async <T>(
  queryBuilder: SelectQueryBuilder<T>,
  cacheOption: TypeORMCacheType,
): Promise<number> => {
  const totalQueryBuilder = queryBuilder.clone();
  if (
    totalQueryBuilder.expressionMap.mainAlias?.metadata.primaryColumns.length >
    0
  )
    return totalQueryBuilder.getCount();

  totalQueryBuilder
    .skip(undefined)
    .limit(undefined)
    .offset(undefined)
    .take(undefined)
    .orderBy(undefined);

  const { value } = await queryBuilder.connection
    .createQueryBuilder()
    .select('COUNT(*)', 'value')
    .from(`(${totalQueryBuilder.getQuery()})`, 'uniqueTableAlias')
    .cache(cacheOption)
    .setParameters(queryBuilder.getParameters())
    .getRawOne<{ value: string }>();

  return Number(value);
};
