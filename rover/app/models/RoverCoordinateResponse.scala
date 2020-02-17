package models

import play.api.libs.json.{Json, OFormat}
import models.CardinalDirections.CardinalDirection

case class RoverCoordinateResponse(xCoordinate: Int, yCoordinate: Int, direction: CardinalDirection)

object RoverCoordinateResponse {
  implicit val roverCoordinateResponse: OFormat[RoverCoordinateResponse] = Json.format[RoverCoordinateResponse]
}
