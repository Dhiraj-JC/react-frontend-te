pipeline {
    agent any
    tools {
        nodejs '14.16.1'
    }
    stages {
      stage('Project Clone') {
          steps {
              git 'https://github.com/Dhiraj-JC/react-frontend-te.git'
          }
      }  
       stage('Install Dependencies') {
          steps {
              sh 'npm install'
          }
      }
      stage('Build Project') {
          steps {
              sh 'npm run build'
          }
      }
    }
}
