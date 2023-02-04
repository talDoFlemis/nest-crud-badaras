pipeline{
  agent any;
  tools{
    nodejs("18/lts")
  }

  stages{
    stage('Install Dependencies') {
      steps {
        sh 'npm --version'
      }
    }

    stage('Build') {
      steps {
        sh 'echo "Running Build 2"'
      }
    }
  }
}
