pipeline {
  agent any

  stages {
    stage ('Build') {
      steps {
        sh 'docker build -t my-image .'
      }
    }

    stage ('Archive') {
      steps {
        sh 'docker push my-image'
      }
    }

    stage ('Deploy') {
      steps {
        ssh "${USERNAME}@${MACHINE_NAME}" "
          cd /opt/ohdsi/howoften && git fetch --all && git checkout master && git pull && sudo docker-compose up -d
        "
      }
    }
  }
}