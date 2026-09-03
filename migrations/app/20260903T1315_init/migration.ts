#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/b4b5bb29def9743d06f13b0e1ccb5543d3382fbd380795d3c107ecb64dcb15c8/contract';
import endContract from '../../snapshots/b4b5bb29def9743d06f13b0e1ccb5543d3382fbd380795d3c107ecb64dcb15c8/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'application',
        columns: [
          col('appliedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('coverLetterId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('followUpAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('jobId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('notes', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('resumeVariantId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('SAVED'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'application_status_check_648bf800',
            "\"status\" IN ('SAVED', 'PREPARING', 'APPLIED', 'FOLLOW_UP', 'INTERVIEW', 'REJECTED', 'OFFER', 'WITHDRAWN')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'company',
        columns: [
          col('careerPageUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('city', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('country', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('logoUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('website', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'coverLetter',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('editedContent', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('generatedContent', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('jobId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'job',
        columns: [
          col('companyId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('contentHash', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('employmentType', 'text', {
            notNull: true,
            default: lit('UNKNOWN'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('expiresAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('externalId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('isActive', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('latitude', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
          col('location', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('longitude', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
          col('normalizedTitle', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('publishedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('requirements', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('seniority', 'text', {
            notNull: true,
            default: lit('UNKNOWN'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('source', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('sourceUrl', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('workplaceType', 'text', {
            notNull: true,
            default: lit('UNKNOWN'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'job_employmentType_check_6282316d',
            "\"employmentType\" IN ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'TEMPORARY', 'FREELANCE', 'UNKNOWN')",
          ),
          checkExpression(
            'job_seniority_check_a8fc7737',
            "\"seniority\" IN ('INTERN', 'JUNIOR', 'MID', 'SENIOR', 'LEAD', 'UNKNOWN')",
          ),
          checkExpression(
            'job_workplaceType_check_0ecb1ac0',
            "\"workplaceType\" IN ('ONSITE', 'HYBRID', 'REMOTE', 'UNKNOWN')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'jobMatch',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('explanation', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('jobId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('missingSkills', 'json', { codecRef: { codecId: 'pg/json@1' } }),
          col('modelVersion', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('partialMatches', 'json', { codecRef: { codecId: 'pg/json@1' } }),
          col('score', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('searchProfileId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('strongMatches', 'json', { codecRef: { codecId: 'pg/json@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'jobSkill',
        columns: [
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('importance', 'text', {
            notNull: true,
            default: lit('MEDIUM'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('jobId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('required', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('skillId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'jobSkill_importance_check_916cf5bb',
            "\"importance\" IN ('LOW', 'MEDIUM', 'HIGH')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'profile',
        columns: [
          col('city', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('headline', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('latitude', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
          col('longitude', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
          col('remotePreference', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('seniority', 'text', {
            notNull: true,
            default: lit('UNKNOWN'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('summary', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('yearsOfExperience', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'profile_remotePreference_check_8dc8bb70',
            "\"remotePreference\" IN ('ONSITE', 'HYBRID', 'REMOTE', 'UNKNOWN')",
          ),
          checkExpression(
            'profile_seniority_check_a8fc7737',
            "\"seniority\" IN ('INTERN', 'JUNIOR', 'MID', 'SENIOR', 'LEAD', 'UNKNOWN')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'resume',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('isMaster', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('originalFileUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('summary', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'resumeEducation',
        columns: [
          col('degree', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('endDate', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('resumeId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('school', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('sortOrder', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('startDate', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'resumeExperience',
        columns: [
          col('company', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('endDate', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('resumeId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('role', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('sortOrder', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('startDate', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'resumeSkill',
        columns: [
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('resumeId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('skillId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'resumeVariant',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('editedContent', 'json', { codecRef: { codecId: 'pg/json@1' } }),
          col('generatedContent', 'json', { codecRef: { codecId: 'pg/json@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('jobId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('resumeId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'savedJob',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('jobId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'searchProfile',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('employmentTypes', 'text[]', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1', many: true },
          }),
          col('excludeKeywords', 'text[]', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1', many: true },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('isActive', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('jobTitles', 'text[]', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1', many: true },
          }),
          col('keywords', 'text[]', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1', many: true },
          }),
          col('latitude', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
          col('location', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('longitude', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
          col('minimumMatchScore', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('radiusKm', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('seniority', 'text[]', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1', many: true },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('workplaceTypes', 'text[]', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1', many: true },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'searchProfile_employmentTypes_check_24e00a30',
            "\"employmentTypes\"::text[] <@ ARRAY['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'TEMPORARY', 'FREELANCE', 'UNKNOWN']::text[]",
          ),
          checkExpression(
            'searchProfile_employmentTypes_elem_not_null_15e27405',
            'array_position("employmentTypes", NULL) IS NULL',
          ),
          checkExpression(
            'searchProfile_excludeKeywords_elem_not_null_cb7d0216',
            'array_position("excludeKeywords", NULL) IS NULL',
          ),
          checkExpression(
            'searchProfile_jobTitles_elem_not_null_6f570ae8',
            'array_position("jobTitles", NULL) IS NULL',
          ),
          checkExpression(
            'searchProfile_keywords_elem_not_null_f10c6f3f',
            'array_position("keywords", NULL) IS NULL',
          ),
          checkExpression(
            'searchProfile_seniority_check_9f513e38',
            "\"seniority\"::text[] <@ ARRAY['INTERN', 'JUNIOR', 'MID', 'SENIOR', 'LEAD', 'UNKNOWN']::text[]",
          ),
          checkExpression(
            'searchProfile_seniority_elem_not_null_ada4d838',
            'array_position("seniority", NULL) IS NULL',
          ),
          checkExpression(
            'searchProfile_workplaceTypes_check_b66b8403',
            "\"workplaceTypes\"::text[] <@ ARRAY['ONSITE', 'HYBRID', 'REMOTE', 'UNKNOWN']::text[]",
          ),
          checkExpression(
            'searchProfile_workplaceTypes_elem_not_null_a611bf35',
            'array_position("workplaceTypes", NULL) IS NULL',
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'searchProfileSkill',
        columns: [
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('searchProfileId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('skillId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'skill',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('normalizedName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'user',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'userSkill',
        columns: [
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('level', 'text', {
            notNull: true,
            default: lit('UNKNOWN'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('skillId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('yearsExperience', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'userSkill_level_check_b982d5d6',
            "\"level\" IN ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT', 'UNKNOWN')",
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'application',
        constraint: 'application_userId_jobId_key',
        columns: ['userId', 'jobId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'company',
        constraint: 'company_slug_key',
        columns: ['slug'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'job',
        constraint: 'job_source_externalId_key',
        columns: ['source', 'externalId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'jobMatch',
        constraint: 'jobMatch_userId_jobId_key',
        columns: ['userId', 'jobId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'jobSkill',
        constraint: 'jobSkill_jobId_skillId_key',
        columns: ['jobId', 'skillId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'profile',
        constraint: 'profile_userId_key',
        columns: ['userId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'resumeSkill',
        constraint: 'resumeSkill_resumeId_skillId_key',
        columns: ['resumeId', 'skillId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'savedJob',
        constraint: 'savedJob_userId_jobId_key',
        columns: ['userId', 'jobId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'searchProfileSkill',
        constraint: 'searchProfileSkill_searchProfileId_skillId_key',
        columns: ['searchProfileId', 'skillId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'skill',
        constraint: 'skill_normalizedName_key',
        columns: ['normalizedName'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_email_key',
        columns: ['email'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'userSkill',
        constraint: 'userSkill_userId_skillId_key',
        columns: ['userId', 'skillId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'application',
        index: 'application_coverLetterId_idx_bc794bc2',
        columns: ['coverLetterId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'application',
        index: 'application_followUpAt_idx_99c7bd51',
        columns: ['followUpAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'application',
        index: 'application_jobId_idx_623c8f77',
        columns: ['jobId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'application',
        index: 'application_resumeVariantId_idx_ca082296',
        columns: ['resumeVariantId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'application',
        index: 'application_status_idx_e98638ab',
        columns: ['status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'application',
        index: 'application_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'coverLetter',
        index: 'coverLetter_jobId_idx_623c8f77',
        columns: ['jobId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'coverLetter',
        index: 'coverLetter_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'coverLetter',
        index: 'coverLetter_userId_jobId_idx_e8678b5c',
        columns: ['userId', 'jobId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'job',
        index: 'job_companyId_idx_33acc5ed',
        columns: ['companyId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'job',
        index: 'job_isActive_idx_77fe3ba1',
        columns: ['isActive'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'job',
        index: 'job_location_idx_7f5d3991',
        columns: ['location'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'job',
        index: 'job_publishedAt_idx_36121b91',
        columns: ['publishedAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'job',
        index: 'job_title_idx_1c94c7b6',
        columns: ['title'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'jobMatch',
        index: 'jobMatch_jobId_idx_623c8f77',
        columns: ['jobId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'jobMatch',
        index: 'jobMatch_score_idx_341b473a',
        columns: ['score'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'jobMatch',
        index: 'jobMatch_searchProfileId_idx_a9f5cc1f',
        columns: ['searchProfileId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'jobMatch',
        index: 'jobMatch_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'jobSkill',
        index: 'jobSkill_jobId_idx_623c8f77',
        columns: ['jobId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'jobSkill',
        index: 'jobSkill_skillId_idx_6e19993d',
        columns: ['skillId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'resume',
        index: 'resume_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'resumeEducation',
        index: 'resumeEducation_resumeId_idx_679bbe5e',
        columns: ['resumeId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'resumeExperience',
        index: 'resumeExperience_resumeId_idx_679bbe5e',
        columns: ['resumeId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'resumeSkill',
        index: 'resumeSkill_resumeId_idx_679bbe5e',
        columns: ['resumeId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'resumeSkill',
        index: 'resumeSkill_skillId_idx_6e19993d',
        columns: ['skillId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'resumeVariant',
        index: 'resumeVariant_jobId_idx_623c8f77',
        columns: ['jobId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'resumeVariant',
        index: 'resumeVariant_resumeId_idx_679bbe5e',
        columns: ['resumeId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'resumeVariant',
        index: 'resumeVariant_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'resumeVariant',
        index: 'resumeVariant_userId_jobId_idx_e8678b5c',
        columns: ['userId', 'jobId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'savedJob',
        index: 'savedJob_jobId_idx_623c8f77',
        columns: ['jobId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'savedJob',
        index: 'savedJob_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'searchProfile',
        index: 'searchProfile_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'searchProfileSkill',
        index: 'searchProfileSkill_searchProfileId_idx_a9f5cc1f',
        columns: ['searchProfileId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'searchProfileSkill',
        index: 'searchProfileSkill_skillId_idx_6e19993d',
        columns: ['skillId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'userSkill',
        index: 'userSkill_skillId_idx_6e19993d',
        columns: ['skillId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'userSkill',
        index: 'userSkill_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'application',
        foreignKey: {
          name: 'application_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'application',
        foreignKey: {
          name: 'application_jobId_fkey',
          columns: ['jobId'],
          references: { schema: 'public', table: 'job', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'application',
        foreignKey: {
          name: 'application_resumeVariantId_fkey',
          columns: ['resumeVariantId'],
          references: { schema: 'public', table: 'resumeVariant', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'application',
        foreignKey: {
          name: 'application_coverLetterId_fkey',
          columns: ['coverLetterId'],
          references: { schema: 'public', table: 'coverLetter', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'coverLetter',
        foreignKey: {
          name: 'coverLetter_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'coverLetter',
        foreignKey: {
          name: 'coverLetter_jobId_fkey',
          columns: ['jobId'],
          references: { schema: 'public', table: 'job', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'job',
        foreignKey: {
          name: 'job_companyId_fkey',
          columns: ['companyId'],
          references: { schema: 'public', table: 'company', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'jobMatch',
        foreignKey: {
          name: 'jobMatch_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'jobMatch',
        foreignKey: {
          name: 'jobMatch_jobId_fkey',
          columns: ['jobId'],
          references: { schema: 'public', table: 'job', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'jobMatch',
        foreignKey: {
          name: 'jobMatch_searchProfileId_fkey',
          columns: ['searchProfileId'],
          references: { schema: 'public', table: 'searchProfile', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'jobSkill',
        foreignKey: {
          name: 'jobSkill_jobId_fkey',
          columns: ['jobId'],
          references: { schema: 'public', table: 'job', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'jobSkill',
        foreignKey: {
          name: 'jobSkill_skillId_fkey',
          columns: ['skillId'],
          references: { schema: 'public', table: 'skill', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'profile',
        foreignKey: {
          name: 'profile_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'resume',
        foreignKey: {
          name: 'resume_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'resumeEducation',
        foreignKey: {
          name: 'resumeEducation_resumeId_fkey',
          columns: ['resumeId'],
          references: { schema: 'public', table: 'resume', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'resumeExperience',
        foreignKey: {
          name: 'resumeExperience_resumeId_fkey',
          columns: ['resumeId'],
          references: { schema: 'public', table: 'resume', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'resumeSkill',
        foreignKey: {
          name: 'resumeSkill_resumeId_fkey',
          columns: ['resumeId'],
          references: { schema: 'public', table: 'resume', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'resumeSkill',
        foreignKey: {
          name: 'resumeSkill_skillId_fkey',
          columns: ['skillId'],
          references: { schema: 'public', table: 'skill', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'resumeVariant',
        foreignKey: {
          name: 'resumeVariant_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'resumeVariant',
        foreignKey: {
          name: 'resumeVariant_resumeId_fkey',
          columns: ['resumeId'],
          references: { schema: 'public', table: 'resume', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'resumeVariant',
        foreignKey: {
          name: 'resumeVariant_jobId_fkey',
          columns: ['jobId'],
          references: { schema: 'public', table: 'job', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'savedJob',
        foreignKey: {
          name: 'savedJob_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'savedJob',
        foreignKey: {
          name: 'savedJob_jobId_fkey',
          columns: ['jobId'],
          references: { schema: 'public', table: 'job', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'searchProfile',
        foreignKey: {
          name: 'searchProfile_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'searchProfileSkill',
        foreignKey: {
          name: 'searchProfileSkill_searchProfileId_fkey',
          columns: ['searchProfileId'],
          references: { schema: 'public', table: 'searchProfile', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'searchProfileSkill',
        foreignKey: {
          name: 'searchProfileSkill_skillId_fkey',
          columns: ['skillId'],
          references: { schema: 'public', table: 'skill', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'userSkill',
        foreignKey: {
          name: 'userSkill_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'userSkill',
        foreignKey: {
          name: 'userSkill_skillId_fkey',
          columns: ['skillId'],
          references: { schema: 'public', table: 'skill', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
