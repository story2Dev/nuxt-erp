create function now_utc() returns timestamp as $$
  select now() at time zone 'utc';
$$ language sql;

create table if not exists terms (
    id uuid primary key default gen_random_uuid(),
    name character varying not null,
    group_id int null,
    parent_id uuid null references terms(id),
    created_at timestamp not null default now_utc(),
    updated_at timestamp not null default now_utc()
 );

create table if not exists term_items (
    id uuid primary key default gen_random_uuid(),
    term_id uuid not null references terms(id),
    key character varying not null,
    value character varying not null,
    created_at timestamp not null default now_utc(),
    updated_at timestamp not null default now_utc()
);


create table if not exists accounts (
  id uuid primary key default gen_random_uuid(),
  code character varying not null,
  name character varying not null,
  account_type character varying null,
  balance numeric(15,2) not null default 0,
  parent_id uuid null references accounts(id),
  created_at timestamp not null default now_utc(),
  updated_at timestamp not null default now_utc()
);

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  description character varying null,
  created_at timestamp not null default now_utc(),
  updated_at timestamp not null default now_utc()
);

create table if not exists transaction_items (
  id uuid primary key default gen_random_uuid(),
    transaction_id uuid not null references transactions(id),
    account_id uuid not null references accounts(id),
    amount numeric(15,2) not null,
    type character varying not null,
    created_at timestamp not null default now_utc(),
    updated_at timestamp not null default now_utc()
);

create table if not exists employees (
  id uuid primary key default gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  hire_date DATE NOT NULL,
  job_title VARCHAR(100) null,
  user_id uuid null references auth.users(id),
  department_id uuid null references terms(id),
  created_at timestamp not null default now_utc(),
  updated_at timestamp not null default now_utc()
);

create table if not exists employee_departments (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references employees(id),
  department_id uuid not null references terms(id),
  created_at timestamp not null default now_utc(),
  updated_at timestamp not null default now_utc()
);

create table if not exists employee_salaries (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references employees(id),
  salary numeric(15,2) not null,
  from_date DATE NOT NULL,
  to_date DATE NOT NULL,
  active boolean not null default true,
  created_at timestamp not null default now_utc(),
  updated_at timestamp not null default now_utc()
);

-- Inventory Management Module
CREATE TABLE products (
 id uuid primary key default gen_random_uuid(),
  name character varying not null,
  sku VARCHAR(100) NULL,
  barcode VARCHAR(100) NULL,
  description TEXT,
  cost DECIMAL(15, 2) NOT NULL,
  unit_price DECIMAL(15, 2) NOT NULL,
  stock_quantity INT DEFAULT 0,
  stock_trackable boolean not null default true,
  thumbnail character varying null,
  type_id uuid null references terms(id),
  category_id uuid null references terms(id),
  parent_id uuid null references products(id),
  created_at timestamp not null default now_utc(),
  updated_at timestamp not null default now_utc()
);

CREATE TABLE product_data (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id),
  key character varying not null,
  value character varying not null,
  created_at timestamp not null default now_utc(),
  updated_at timestamp not null default now_utc()
);


-- Order Processing Module
CREATE TABLE customers (
  id uuid primary key default gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NULL,
  user_id uuid null references auth.users(id),
  created_at timestamp not null default now_utc(),
);


CREATE TABLE orders (
  id uuid primary key default gen_random_uuid(),
  customer_id INT REFERENCES customers(customer_id),
  order_date DATE NOT NULL,
  total_amount DECIMAL(15, 2) NOT NULL,
  created_at timestamp not null default now_utc(),
  updated_at timestamp not null default now_utc()
);

CREATE TABLE order_items (
  order_item_id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(order_id),
  product_id INT REFERENCES products(id),
  quantity INT NOT NULL,
  unit_price DECIMAL(15, 2) NOT NULL,
  created_at timestamp not null default now_utc(),
  updated_at timestamp not null default now_utc()
);