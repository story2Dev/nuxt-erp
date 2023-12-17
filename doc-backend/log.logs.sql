create schema if not exists log;

create table if not exists log.logs (
  id uuid primary key default gen_random_uuid(),
  tag character varying not null,
  title character varying not null,
  data jsonb null,
  user_id uuid null,
  object_id uuid null,
  ip inet null,
  user_agent character varying null,
  created_at timestamp without time zone not null default now_utc(),
  updated_at timestamp without time zone not null default now_utc()
);