# Je prends l'identité admin_cuisto
export PGUSER=admin_cuisto
export PGPASSWORD=cuisto

sqitch revert # revert tout
# sqitch revert 1.create_tables
# sqitch revert 5.tracking # je souhaite revenir à la version 3