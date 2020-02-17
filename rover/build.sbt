name := "v1/rover"
organization := "moon"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.13.1"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "5.0.0" % Test
libraryDependencies += "org.joda" % "joda-convert" % "2.2.1"
libraryDependencies += "net.logstash.logback" % "logstash-logback-encoder" % "6.2"
libraryDependencies += "io.lemonlabs" %% "scala-uri" % "1.5.1"
libraryDependencies += "net.codingwell" %% "scala-guice" % "4.2.6"
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "5.0.0" % Test
libraryDependencies ++= Seq("org.slf4j" % "slf4j-api" % "1.7.5",
  "org.slf4j" % "slf4j-simple" % "1.7.5")

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "moon.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "moon.binders._"
