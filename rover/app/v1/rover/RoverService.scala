package v1.rover

import models.RoverCoordinateResponse
import models.CardinalDirections._

class RoverService {

  def calculatePosition(currentLocation: String, commands: String): RoverCoordinateResponse = {
    val (x,y,direction): (Int, Int, CardinalDirection) = runCommands(getStartingPosition(currentLocation), commands)
    RoverCoordinateResponse(x, y, direction)
  }

  private def getStartingPosition(currentPosition: String): (Int, Int, CardinalDirection) = {
    val (x,y) = getStartingCoordinates(currentPosition)
    val direction = getStartingDirection(currentPosition)
    (x,y,direction)
  }

  private def getStartingCoordinates(currentPosition: String): (Int, Int) = {
    (currentPosition.trim.charAt(0).asDigit, currentPosition.charAt(1).asDigit)
  }

  private def getStartingDirection(currentPosition: String): CardinalDirection = {
    charToDirection(currentPosition.charAt(2))
  }

  private def runCommands(position: (Int, Int, CardinalDirection), commands: String): (Int, Int, CardinalDirection) = {
    commands.head match {
      case 'M' =>
        if (commands.tail.isEmpty) moveRover(position, commands.head)
        else  runCommands(moveRover(position, commands.head), commands.tail)
      case 'R' | 'L' =>
        if (commands.tail.isEmpty) redirectRover(position, commands.head)
        else runCommands(redirectRover(position, commands.head), commands.tail)
    }
  }

  private def moveRover(position: (Int, Int, CardinalDirection), command: Char): (Int, Int, CardinalDirection) = {
    val(x, y, cardDir) = position
    cardDir match {
      case NORTH => (x, y + 1, cardDir)
      case SOUTH => (x, y - 1, cardDir)
      case EAST => (x - 1, y, cardDir)
      case _ => (x + 1, y, cardDir)
    }
  }

  private def redirectRover(position: (Int, Int, CardinalDirection), command: Char): (Int, Int, CardinalDirection) = {
    val(x, y, cardDir) = position
    val newDirection = if(command.toUpper == 'L') {
      if (cardDir == NORTH) WEST else intToDirection(directionToInt(cardDir) - 1)
    } else {
      if (cardDir == WEST) NORTH else intToDirection(directionToInt(cardDir) + 1)
    }
    (x, y, newDirection)
  }

}
