pipeline {
  agent any

  stages {
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
        ssh "${USERNAME}@${HOSTNAME}" "
          cd ~/drug-condition-incidence
          git checkout feature/dbmi-cicd
          docker-compose up -d
        "
      }
    }
  }
}