-- CREATION DE LA 1ere version du SCRIPT

CREATE TABLE IF NOT EXISTS fridge ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text not null,
    temperature_required int not null

);

CREATE TABLE IF NOT EXISTS goods ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text not null,
    temperature_required int not null
);

CREATE TABLE IF NOT EXISTS supplier ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text not null,
    contact text   
);

CREATE TABLE IF NOT EXISTS app_user ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname text not null,
    lastname text not null,
    code text not null,
    email text not null,
    password text not null,
    role default "member" 
);

CREATE TABLE IF NOT EXISTS reception_controle ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    temperature int not null,
    vehicle_compliance boolean,
    packaging_condition boolean,
    expiration_date boolean,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    description text default "RAS",
    app_user_id int references app_user(id),
    goods_id  int references goods(id),
    supplier_id int references supplier(id)
);

CREATE TABLE IF NOT EXISTS fridge_controle ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    temperature text not null,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    fridge_id int references fridge(id),
    app_user_id int references app_user(id)
);


CREATE TABLE IF NOT EXISTS warning ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMPTZ ,
    warning_status boolean default "true",
    description text default "WARNING"
);
