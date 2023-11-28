

INSERT INTO fridge("name", "temperature_required") VALUES (
    ('Chambre froide négative', -18),
    ('Chambre froide viande', 4),
    ('Chambre froide poisson', 2)
);

INSERT INTO supplier("name", "contact") VALUES (
    ('Pomoni', 'pomoni@outlook.com'),
    ('Charculard', 'charculard@outlook.com'),
    ('CapOcean', 'capocean@outlook.com')
);

INSERT INTO goods("name", "temperature_required") VALUES (
    ('poisson', 2),
    ('beurre/oeuf/fromage', 8),
    ('viande', 4)
    ('plat traiteur', 3),
    ('fruits et légumes', 12),
    ('gibier', 3),
    ('crème glacée', -18),
    ('surgelé', -18) 
);

INSERT INTO app_user ("firstname", "lastname", "code" ,"email", "password","role")VALUES(
    ('Nicolas', 'foaster', 'A896', 'nico@cuisto.com' , '644556'),
    ('Léo', 'marron', 'A669', 'leoma@cuisto.com' , '654456', 'admin'),
    ('Sandra', 'delaire', 'A711', 'sandra@cuisto.com' , '654456')
);


INSERT INTO fridge_controle ("temperature", "fridge_id", "app_user_id")VALUES(
    (-18, 1, 1),
    (-19, 1, 2),
    (2, 2, 3),
    (2, 2, 3)
);
