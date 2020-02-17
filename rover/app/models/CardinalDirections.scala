package models

import play.api.libs.json._

object CardinalDirections extends Enumeration {
  type CardinalDirection = Value
  val NORTH, SOUTH, EAST, WEST= Value

  def intToDirection(in: Int) : CardinalDirection = Option(in) match {
    case Some(0)    => NORTH
    case Some(2)    => SOUTH
    case Some(1)    => EAST
    case Some(3)    => WEST
  }

  def directionToInt(direction: CardinalDirection) : Int = Option(direction) match {
    case Some(NORTH)   => 0
    case Some(SOUTH)   => 2
    case Some(EAST)    => 1
    case Some(WEST)    => 3
  }

  def charToDirection(in: Char) : CardinalDirection = Option(in.toUpper) match {
    case Some('N')    => NORTH
    case Some('S')    => SOUTH
    case Some('E')    => EAST
    case Some('W')    => WEST
  }


  implicit val CardinalDirectionsFormats: Format[CardinalDirection] =
    Format(Reads.enumNameReads(this), Writes.enumNameWrites[this.type])
}
