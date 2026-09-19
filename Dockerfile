# ----------------------------------------------------
# Stage 1: Build Next.js Frontend
# ----------------------------------------------------
FROM node:20-slim AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci || npm install

COPY frontend/ ./
RUN npm run build

# ----------------------------------------------------
# Stage 2: Build Spring Boot Backend with Embedded Frontend
# ----------------------------------------------------
FROM eclipse-temurin:17-jdk-alpine AS backend-builder
WORKDIR /app

# Copy Maven wrapper & POM
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw

# Download Maven dependencies
RUN ./mvnw dependency:go-offline -B || true

# Copy Java source code
COPY src ./src

# Copy built static frontend files into Spring Boot static resources directory
COPY --from=frontend-builder /app/frontend/out ./src/main/resources/static

# Build Spring Boot executable JAR with embedded frontend
RUN ./mvnw clean package -DskipTests

# ----------------------------------------------------
# Stage 3: Minimal Production Runtime
# ----------------------------------------------------
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the final self-contained JAR
COPY --from=backend-builder /app/target/*.jar app.jar

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
