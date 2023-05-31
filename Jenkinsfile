pipeline {
  agent any

  stages {
    stage ('Build') {
      steps {
        echo 'Building..'
        //sh 'docker-compose build .'
      }
    }

    stage ('Archive') {
      steps {
        echo 'Archiving..'
        //sh 'docker push my-image'
      }
    }

    stage ('Deploy') {
      steps {
        echo 'Deploying..'
        //ssh "${USERNAME}@${MACHINE_NAME}" "
        //  cd /opt/ohdsi/howoften && git fetch --all && git checkout master && git pull && sudo docker-compose up -d
        //"
        //sh 'cd /opt/ohdsi/howoften && git fetch --all && git checkout feature/dbmi-cicd && git pull && sudo docker-compose up -d'
        sh 'pwd'
      }
    }
  }
}