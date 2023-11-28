# donner les droits d'exécution du fichier :
# chmod +x init_db.sh 

# Je prends l'identité de spedata :
export PGUSER=sardev

# Je supprime la BDD cuisto et l'utilisateur admin_cuisto
dropdb cuisto
echo "BDD supprimée"
dropuser admin_cuisto
echo "admin_cuisto supprimé"

# Je crèe la BDD cuisto et l'utilisateur admin_cuisto
createuser admin_cuisto -P
echo "admin_cuisto créé"
createdb cuisto -O admin_cuisto
echo "BDD créée"

# Je supprime sqitch.conf et sqitch.plan
rm sqitch.conf
rm sqitch.plan

# J'initiase Sqitch
sqitch init cuisto --target db:pg:cuisto
echo "Sqitch initialisé"

