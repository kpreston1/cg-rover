# CG Rover Run Documentation:

First clone the cg-rover repo.
* git clone https://github.com/kpreston1/cg-rover.git

### Running rover - backend: 
* The Rover BE is written in Scala, utilizing sbt. To run the BE follow the below steps.
	* Make sure Java 1.8 is downloaded.
		* java --version
	* Once java is downloaded use brew to install Scala
      * brew install scala
	* Once Scala is install go to the root directory of rover and spin up a local instance of the BE.
		* sbt run
	* The Rover BE should now be running on localhost:9000
* Link: https://www.scala-lang.org/download/


### Running rover-web-app - front-end:
* The rover-web-app FE is written in Angular, utilizing Angular CLI. To run the FE follow the below steps.
	* Make sure npm package manager is installed.
		* node -v 
	* Once npm is downloaded use it to install Angular CLI
		* npm install -g @angular/cli
	* Once Angular CLI has been downloaded go to the root directory of rover-web-app and run the application.
		* ng serve --open
* Link: https://angular.io/guide/setup-local
* Link: https://www.npmjs.com/get-npm
