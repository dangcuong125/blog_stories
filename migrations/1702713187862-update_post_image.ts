import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostImage1702713187862 implements MigrationInterface {
    name = 'updatePostImage1702713187862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_6f5531bea310c8d5d58f2e7b2f0"`);
        await queryRunner.query(`CREATE TABLE "post_images" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "user_id" integer NOT NULL, "post_id" integer NOT NULL, "image_id" integer NOT NULL, CONSTRAINT "PK_32fe67d8cdea0e7536320d7c454" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "post_id"`);
        await queryRunner.query(`ALTER TABLE "post_images" ADD CONSTRAINT "FK_cbea080987be6204e913a691aea" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_images" ADD CONSTRAINT "FK_b40444c37902571dd8ca22f106d" FOREIGN KEY ("image_id") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_images" DROP CONSTRAINT "FK_b40444c37902571dd8ca22f106d"`);
        await queryRunner.query(`ALTER TABLE "post_images" DROP CONSTRAINT "FK_cbea080987be6204e913a691aea"`);
        await queryRunner.query(`ALTER TABLE "file" ADD "post_id" integer`);
        await queryRunner.query(`DROP TABLE "post_images"`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_6f5531bea310c8d5d58f2e7b2f0" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
