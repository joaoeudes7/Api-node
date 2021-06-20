provider "local" {}

resource "docker_container" "application" {
  image    = "${docker_image.application.latest}"
  must_run = true
  name     = "API"
  ports {
    internal = 3000
    external = 3000
  }
}

# Find the latest Ubuntu precise image.
resource "docker_image" "application" {
  name = "pengbai/docker-supermario"
}
