import { MigrationInterface, QueryRunner } from "typeorm";

export class createMigrationPost1702615763279 implements MigrationInterface {
    name = 'createMigrationPost1702615763279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorite_post" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "user_id" integer NOT NULL, "post_id" integer NOT NULL, CONSTRAINT "PK_2643df4f83c97f24e261cbee403" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "user_id" integer NOT NULL, "post_id" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "content" character varying NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment_post" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "content" character varying NOT NULL, "user_id" integer NOT NULL, "post_id" integer NOT NULL, CONSTRAINT "PK_8aa21186314ce53c5b61a0e8c93" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "file" ADD "post_id" integer`);
        await queryRunner.query(`ALTER TABLE "favorite_post" ADD CONSTRAINT "FK_0af3f1cd74d78a1fcb7d2ae9aff" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_post" ADD CONSTRAINT "FK_a463b4b054e75a65851033ad8bd" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_6f5531bea310c8d5d58f2e7b2f0" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_3ee113bf568b5efdc29cd95a360" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_post" ADD CONSTRAINT "FK_3e9131f180c96dbfdb8bbcd0492" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_post" ADD CONSTRAINT "FK_7ec740a408dfebbda67596313df" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment_post" DROP CONSTRAINT "FK_7ec740a408dfebbda67596313df"`);
        await queryRunner.query(`ALTER TABLE "comment_post" DROP CONSTRAINT "FK_3e9131f180c96dbfdb8bbcd0492"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_3ee113bf568b5efdc29cd95a360"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_6f5531bea310c8d5d58f2e7b2f0"`);
        await queryRunner.query(`ALTER TABLE "favorite_post" DROP CONSTRAINT "FK_a463b4b054e75a65851033ad8bd"`);
        await queryRunner.query(`ALTER TABLE "favorite_post" DROP CONSTRAINT "FK_0af3f1cd74d78a1fcb7d2ae9aff"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "post_id"`);
        await queryRunner.query(`DROP TABLE "comment_post"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TABLE "favorite_post"`);
    }

}
