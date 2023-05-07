pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t stayyoung-ui .'
            }
        }
        stage('Stop old container') {
            steps {
                sh 'docker rm stayyoung-ui --force'
            }
        }
        stage('Start New Container') {
            steps {
                sh 'docker run -p 3007:3000 -d --name stayyoung-ui stayyoung-ui'
            }
        }
    }
}