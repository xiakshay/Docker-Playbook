
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        IMAGE_NAME = "oracle-counter-website"
        CONTAINER_NAME = "oracle-counter-website"
        NETWORK_NAME = "counter-network"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Validate Files') {
            steps {
                sh '''
                    test -f website/Dockerfile
                    test -f website/package.json
                    test -f website/server.js
                    test -f website/public/index.html
                    echo "Website files verified."
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build \
                      -t ${IMAGE_NAME}:${BUILD_NUMBER} \
                      -t ${IMAGE_NAME}:latest \
                      website
                '''
            }
        }

        stage('Deploy Website') {
            steps {
                sh '''
                    docker network inspect ${NETWORK_NAME} >/dev/null

                    docker rm -f ${CONTAINER_NAME} 2>/dev/null || true

                    docker run -d \
                      --name ${CONTAINER_NAME} \
                      --network ${NETWORK_NAME} \
                      -p 3000:3000 \
                      --restart unless-stopped \
                      ${IMAGE_NAME}:${BUILD_NUMBER}
                '''
            }
        }

        stage('Smoke Test') {
            steps {
                sh '''
                    docker run --rm \
                      --network ${NETWORK_NAME} \
                      curlimages/curl:8.12.1 \
                      -fsS http://${CONTAINER_NAME}:3000/api/count
                '''
            }
        }
    }

    post {
        success {
            echo 'Website deployed and API smoke test passed.'
        }
        failure {
            echo 'Pipeline failed. Check Console Output for details.'
        }
    }
}