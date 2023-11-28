-- Deploy cuisto:2.seeding to pg

BEGIN;

INSERT INTO fridge("name", "temperature_required") VALUES 
    ('NY-25', -12),
    ('TX-12', 6),
    ('CA-33', 1),
    ('FL-17', 3),
    ('GA-21', 0),
    ('WA-15', -20),
    ('IL-10', 5),
    ('OH-22', -15),
    ('PA-14', 2),
    ('MI-19', -10);


INSERT INTO supplier("name", "contact") VALUES
    ('JohnDoe', 'johndoe@example.com'),
    ('AliceSmith', 'alicesmith@example.com'),
    ('BobJohnson', 'bobjohnson@example.com'),
    ('Pomoni', 'pomoni@outlook.com'),
    ('Charculard', 'charculard@outlook.com'),
    ('CapOcean', 'capocean@outlook.com');

INSERT INTO goods("name", "temperature_required") VALUES
    ('Fish', 2),
    ('Butter/Egg/Cheese', 8),
    ('Meat', 4),
    ('Ready-made Dish', 3),
    ('Fruits and Vegetables', 12),
    ('Game', 3),
    ('Ice Cream', -18),
    ('Frozen', -18);


INSERT INTO app_user ("firstname", "lastname", "password", "email", "identificant", "role" )VALUES
    ('Nicolas', 'foaster','$2a$05$mxu3x9Az/bY4d5gl93pa2u1Guo1fGSMv6.p1Zn3dBZrgeQ47W6oqe', 'nico@cuisto.fr', 'foaster1542', 'admin'),
    ('Léo', 'marron','$2a$05$mxu3x9Az/bY4d5gl93pa2u1Guo1fGSMv6.p1Zn3dBZrgeQ47W6oqe', 'leo@cuisto.fr', 'marron1542',  'member'),
    ('Sandra', 'delaire','$2a$05$mxu3x9Az/bY4d5gl93pa2u1Guo1fGSMv6.p1Zn3dBZrgeQ47W6oqe', 'sandra@cuisto.fr', 'delaire1542', 'member'),
    ('Philippe', 'Etchebest','$2a$05$mxu3x9Az/bY4d5gl93pa2u1Guo1fGSMv6.p1Zn3dBZrgeQ47W6oqe', 'philou@cuisto.fr', 'Etchebest4024',  'admin');


INSERT INTO fridge_controle ("temperature", "fridge_id", "app_user_id")VALUES
    (-18, 1, 1),
    (-19, 1, 2),
    (2, 2, 3),
    (2, 2, 3),
    (8,2,1),
    (6,2,1);

INSERT INTO reception_controle ("temperature", "vehicle_compliance", "packaging_condition", "expiration_date", "description", "app_user_id", "goods_id", "supplier_id") VALUES
 
  (-18, true, true, true, 'Received fresh batch', 1, 1, 1),
  (4, true, true, false, 'Well-packaged and compliant', 1, 2, 2),
  (2, true, true, true, 'High-quality products', 1, 3, 3),
  (-1, false, false, false, 'Non-compliant shipment', 1, 4, 4),
  (0, true, true, true, 'Fresh produce', 3, 5, 5),
  (3, true, true, false, 'Expired items', 3, 6, 6),
  (6, false, true, true, 'Damaged packaging', 1, 7, 1),
  (-10, true, false, true, 'Frozen goods', 2, 8, 2),
  (8, true, true, true, 'Quality checked', 2, 2, 3),
  (2, false, true, false, 'Temperature concern', 2, 6, 4),
  (12, true, true, true, 'On-time delivery', 1, 7, 5),
  (-5, true, true, false, 'Expired items', 1, 1, 6),
  (5, false, false, true, 'Non-compliant shipment', 1, 5, 1),
  (10, true, true, true, 'Quality checked', 1, 2, 2),
  (-2, true, true, false, 'Temperature concern', 1, 5, 3);

    
INSERT INTO  warning ("description", "warning_status", "fridge_controle_id", "reception_controle_id") VALUES
    ('WARNING', 'true', 5, null ),
    ('NOTHING TO SIGNAL', 'false', 6, null ),
    ('WARNING', 'true', null, 2 ),
    ('WARNING', 'true', null, 3 );

COMMIT;
