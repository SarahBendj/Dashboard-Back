-- Deploy cuisto:1.create_tables to pg

BEGIN;

-- CREATION DE LA 1ere version du SCRIPT

CREATE TABLE  fridge ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text not null,
    temperature_required int not null

);

CREATE TABLE  goods ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text not null,
    temperature_required int not null
);

CREATE TABLE  supplier ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text not null,
    contact text   
);

CREATE TABLE  app_user ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname text not null,
    lastname text not null,
    email text default '@cuisto.fr',
    password text default 'cuistoWZ',
    role varchar(10) default 'member',
    user_status boolean default 'true'
);

CREATE TABLE  reception_controle ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    temperature int not null,
    vehicle_compliance boolean,
    packaging_condition boolean,
    expiration_date boolean,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    description text default 'RAS',
    app_user_id int references app_user(id),
    goods_id  int references goods(id),
    supplier_id int references supplier(id)
);

CREATE TABLE  fridge_controle ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    temperature INT not null ,
    description text default 'NTS',
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    fridge_id int references fridge(id),
    app_user_id int references app_user(id)
);


CREATE TABLE  warning ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMPTZ ,
    warning_status boolean default 'true',
    description text default 'WARNING',
    fridge_controle_id int references fridge_controle(id),
    reception_controle_id int references reception_controle(id)
);

COMMIT;
