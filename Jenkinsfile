pipeline{
  agent any;
  tools{
    nodejs("18/lts")
  }

  stages{
    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Format Code') {
      steps {
        sh 'npm run format'
      }
    }

    stage('Lint Code') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Unit tests') {
      steps {
        sh 'npm run test'
      }
    }
  }
}
