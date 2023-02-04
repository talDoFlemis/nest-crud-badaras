pipeline{
  agent any;
  tools{
    nodejs("18/lts")
  }

  stages{
    stage('Install Dependencies') {
      steps {
        sh 'yarn install'
      }
    }

    stage('Build') {
      steps {
        sh 'yarn build'
      }
    }

    stage('Format Code') {
      steps {
        sh 'yarn format'
      }
    }

    stage('Lint Code') {
      steps {
        sh 'yarn lint'
      }
    }

    stage('Unit tests') {
      steps {
        sh 'yarn test'
      }
    }
  }
}
