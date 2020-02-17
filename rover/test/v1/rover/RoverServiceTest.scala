package v1.rover

import models.CardinalDirections
import org.scalatestplus.play.PlaySpec
import org.scalatestplus.play.guice.GuiceOneAppPerTest
import play.api.test.Injecting

class RoverServiceTest extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "RoverService" should {

    "calculate new position, LMMMMMLMMMMM command should move rover to postion N (5,5)" in {
      val roverService = new RoverService();
      val roverCoordinates = roverService.calculatePosition("00N", "LMMMMRMMMM")
      roverCoordinates.xCoordinate mustBe 4
      roverCoordinates.yCoordinate mustBe 4
      roverCoordinates.direction mustBe CardinalDirections.NORTH
    }

    "calculate new position, L command should turn rover direction north" in {
      val roverService = new RoverService();
      val roverCoordinates = roverService.calculatePosition("00N", "L")
      roverCoordinates.xCoordinate mustBe 0
      roverCoordinates.yCoordinate mustBe 0
      roverCoordinates.direction mustBe CardinalDirections.WEST
    }

    "calculate new position, LL command should turn rover direction north" in {
      val roverService = new RoverService();
      val roverCoordinates = roverService.calculatePosition("00N", "LL")
      roverCoordinates.xCoordinate mustBe 0
      roverCoordinates.yCoordinate mustBe 0
      roverCoordinates.direction mustBe CardinalDirections.SOUTH
    }

    "calculate new position, LLL command should turn rover direction north" in {
      val roverService = new RoverService();
      val roverCoordinates = roverService.calculatePosition("00N", "LLL")
      roverCoordinates.xCoordinate mustBe 0
      roverCoordinates.yCoordinate mustBe 0
      roverCoordinates.direction mustBe CardinalDirections.EAST
    }

    "calculate new position, LLLL command should turn rover direction north" in {
      val roverService = new RoverService();
      val roverCoordinates = roverService.calculatePosition("00N", "LLLL")
      roverCoordinates.xCoordinate mustBe 0
      roverCoordinates.yCoordinate mustBe 0
      roverCoordinates.direction mustBe CardinalDirections.NORTH
    }

    "calculate new position, R command should turn rover direction east" in {
      val roverService = new RoverService();
      val roverCoordinates = roverService.calculatePosition("00N", "R")
      roverCoordinates.xCoordinate mustBe 0
      roverCoordinates.yCoordinate mustBe 0
      roverCoordinates.direction mustBe CardinalDirections.EAST
    }

    "calculate new position, RR command should turn rover direction east" in {
      val roverService = new RoverService();
      val roverCoordinates = roverService.calculatePosition("00N", "RR")
      roverCoordinates.xCoordinate mustBe 0
      roverCoordinates.yCoordinate mustBe 0
      roverCoordinates.direction mustBe CardinalDirections.SOUTH
    }

    "calculate new position, RRR command should turn rover direction south" in {
      val roverService = new RoverService();
      val roverCoordinates = roverService.calculatePosition("00N", "RRR")
      roverCoordinates.xCoordinate mustBe 0
      roverCoordinates.yCoordinate mustBe 0
      roverCoordinates.direction mustBe CardinalDirections.WEST
    }

    "calculate new position, RRRR command should turn rover direction north" in {
      val roverService = new RoverService();
      val roverCoordinates = roverService.calculatePosition("00N", "RRRR")
      roverCoordinates.xCoordinate mustBe 0
      roverCoordinates.yCoordinate mustBe 0
      roverCoordinates.direction mustBe CardinalDirections.NORTH
    }
  }
}
