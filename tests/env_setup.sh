#!/bin/bash
#
# ownCloud

BASEDIR=$PWD

if [ "$DB" == "mysql" ] ; then
	DATABASENAME=documents_test
	DATABASEUSER=documents_test
	ADMINLOGIN=travis
	mysql -e 'CREATE DATABASE IF NOT EXISTS documents_test'
	mysql -e "UPDATE mysql.user SET Password=PASSWORD('travis') WHERE User='travis' AND Host='localhost';"
	mysql -e "FLUSH PRIVILEGES;"
fi

if [ "$DB" == "sqlite" ] ; then
	DATABASENAME=documents_test
	DATABASEUSER=documents_test
	ADMINLOGIN=oc_autotest
fi

DATADIR=$BASEDIR/data-autotest

echo "Using database $DATABASENAME with $DB"

# create autoconfig for sqlite, mysql and postgresql
cat > $BASEDIR/tests/autoconfig-sqlite.php <<DELIM
<?php
\$AUTOCONFIG = array (
  'installed' => false,
  'dbtype' => 'sqlite',
  'dbtableprefix' => 'oc_',
  'adminlogin' => '$ADMINLOGIN',
  'adminpass' => 'admin',
  'directory' => '$DATADIR',
);
DELIM

cat > $BASEDIR/tests/autoconfig-mysql.php <<DELIM
<?php
\$AUTOCONFIG = array (
  'installed' => false,
  'dbtype' => 'mysql',
  'dbtableprefix' => 'oc_',
  'adminlogin' => '$ADMINLOGIN',
  'adminpass' => 'travis',
  'directory' => '$DATADIR',
  'dbuser' => 'travis',
  'dbname' => '$DATABASENAME',
  'dbhost' => 'localhost',
  'dbpass' => 'travis',
);
DELIM

cat > $BASEDIR/tests/autoconfig-pgsql.php <<DELIM
<?php
\$AUTOCONFIG = array (
  'installed' => false,
  'dbtype' => 'pgsql',
  'dbtableprefix' => 'oc_',
  'adminlogin' => '$ADMINLOGIN',
  'adminpass' => 'admin',
  'directory' => '$DATADIR',
  'dbuser' => '$DATABASEUSER',
  'dbname' => '$DATABASENAME',
  'dbhost' => 'localhost',
  'dbpass' => 'owncloud',
);
DELIM

function setup_db {
	echo "Setup environment for $DB testing ..."
	# back to root folder
	cd $BASEDIR

	# reset data directory
	rm -rf $DATADIR
	mkdir $DATADIR

	#rm -rf config/config.php
	cp $BASEDIR/tests/preseed-config.php $BASEDIR/../core/config/config.php

	# copy autoconfig
	cat $BASEDIR/tests/autoconfig-$DB.php
	cp $BASEDIR/tests/autoconfig-$DB.php $BASEDIR/../core/config/autoconfig.php
	ls -l $BASEDIR/../core/config/

	# trigger installation
	cd $BASEDIR/../core/
	php -f index.php
	cd -

	#test execution
	echo "Testing with $DB ..."
	cd tests
}

#
# start test execution
#
setup_db '$DB'

ls $BASEDIR/tests/
ls $BASEDIR/../core/config/
cat $BASEDIR/../core/config/config.php
#ls $BASEDIR/../core/data/
#cat $BASEDIR/../core/data/owncloud.log

#
# NOTES on mysql:
#  - CREATE DATABASE oc_autotest;
#  - CREATE USER 'oc_autotest'@'localhost' IDENTIFIED BY 'owncloud';
#  - grant all on oc_autotest.* to 'oc_autotest'@'localhost';
#
#  - for parallel executor support with EXECUTOR_NUMBER=0:
#  - CREATE DATABASE oc_autotest0;
#  - CREATE USER 'oc_autotest0'@'localhost' IDENTIFIED BY 'owncloud';
#  - grant all on oc_autotest0.* to 'oc_autotest0'@'localhost';
#
# NOTES on pgsql:
#  - su - postgres
#  - createuser -P oc_autotest (enter password and enable superuser)
#  - to enable dropdb I decided to add following line to pg_hba.conf (this is not the safest way but I don't care for the testing machine):
# local	all	all	trust
#
#  - for parallel executor support with EXECUTOR_NUMBER=0:
#  - createuser -P oc_autotest0 (enter password and enable superuser)
#
# NOTES on oci:
#  - it's a pure nightmare to install Oracle on a Linux-System
#  - DON'T TRY THIS AT HOME!
#  - if you really need it: we feel sorry for you
#

cd $BASEDIR
cd ..
git clone https://github.com/owncloud/core
cd core
git submodule update --init
mkdir apps2
ln -s $BASEDIR apps2
cd -

cd $BASEDIR