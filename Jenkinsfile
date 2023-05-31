pipeline {
  agent any

  // stages {
  //   stage ('Build') {
  //     steps {
  //       echo 'Building..'
  //       //sh 'docker-compose build .'
  //     }
  //   }

    // stage ('Archive') {
    //   steps {
    //     echo 'Archiving..'
    //     //sh 'docker push my-image'
    //   }
    // }

    stage ('Deploy') {
      steps {
        echo 'Deploying..'
        sh 'cd /opt/ohdsi/howoften && \
        [ -d .git ] || git clone https://github.com/t-abdul-basser/drug-condition-incidence.git && \
        cd drug-condition-incidence && \
        git fetch --all && \
        git checkout feature/dbmi-cicd && \
        git pull && \
        sudo docker-compose up -d'
      }
    }
  }
}