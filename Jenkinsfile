pipeline {
    agent any

    environment {
        DOCKERHUB_REPO_BACK = "naveen656/todo-backend"
        DOCKERHUB_REPO_FRONT = "naveen656/todo-frontend"
    }

    stages {
        /* =========================
           1. CLEANUP OLD DOCKER IMAGES
           ========================= */
        stage('Cleanup Docker Images') {
            steps {
                echo "🧹 Cleaning up unused Docker images..."
                bat 'docker image prune -f'
            }
        }

        /* =========================
           2. CLONE GIT REPOSITORY
           ========================= */
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        /* =========================
           3. BUILD & PUSH BACKEND IMAGE
           ========================= */
        stage('Build & Push Backend') {
            steps {
                dir('backend') {
                    script {
                        // Build the backend image
                        def backendImage = docker.build(
                            "${DOCKERHUB_REPO_BACK}:${BUILD_NUMBER}",
                            "-f Dockerfile ."
                        )
                        
                        // Push to Docker Hub
                        docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                            backendImage.push()
                            // Optionally push as latest
                            backendImage.push('latest')
                        }
                    }
                }
            }
        }

        /* =========================
           4. BUILD & PUSH FRONTEND IMAGE
           ========================= */
        stage('Build & Push Frontend') {
            steps {
                dir('frontend') {
                    script {
                        // Build the frontend image
                        def frontendImage = docker.build(
                            "${DOCKERHUB_REPO_FRONT}:${BUILD_NUMBER}",
                            "."
                        )
                        
                        // Push to Docker Hub
                        docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                            frontendImage.push()
                            // Optionally push as latest
                            frontendImage.push('latest')
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ Docker images built and pushed successfully!"
        }
        failure {
            echo "❌ Pipeline Failed"
        }
    }
}