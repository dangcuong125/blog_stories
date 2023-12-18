import { MigrationInterface, QueryRunner } from "typeorm";

export class updateRemoveUserId1702713809480 implements MigrationInterface {
    name = 'updateRemoveUserId1702713809480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_images" DROP COLUMN "user_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_images" ADD "user_id" integer NOT NULL`);
    }

}
