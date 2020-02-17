package requests

import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.{JsPath, Json, OFormat, Reads}
import play.api.libs.functional.syntax._

case class RoverPostRequest (currentLocation: String, commands: String) {
  override def toString: String = {
    Json.stringify(Json.toJson(this))
  }
}

object RoverPostRequest {
  val FormDefinition: Form[RoverPostRequest] = Form(
    mapping(
      "currentLocation" -> nonEmptyText,
      "commands" -> nonEmptyText
    )(RoverPostRequest.apply)(RoverPostRequest.unapply)
  )

  implicit val roverPostRequestFormat: OFormat[RoverPostRequest] = Json.format[RoverPostRequest]

  implicit val roverPostReads: Reads[RoverPostRequest] = (
    (JsPath \ "currentPosition").read[String] and
      (JsPath \ "commands").read[String]
    )(RoverPostRequest.apply _)
}