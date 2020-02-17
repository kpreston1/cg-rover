package v1.rover

import javax.inject.{Inject, Singleton}
import play.api.libs.json._
import play.api.mvc.{AnyContent, BaseController, ControllerComponents, Request, Result}

import scala.concurrent.ExecutionContext
import scala.util.matching.Regex

@Singleton
class RoverController @Inject()(val controllerComponents: ControllerComponents, roverService: RoverService)(implicit ec: ExecutionContext) extends BaseController {

  val COMMAND_VERIFICATION: Regex = "([rRlLmM]+)".r
  val POSITION_VERIFICATION: Regex = "([0-9]{2}[NSEW])".r

  def calculateRoverLocation(currentLocation: String, commands: String) = Action { request =>
    if (inputFormatCheck(currentLocation, commands))
      Ok(Json.toJson(roverService.calculatePosition(currentLocation, commands))).withHeaders("Access-Control-Allow-Origin" -> "*")
    else
      BadRequest(Json.toJson(s"Invalid Commands"))
  }

  private def inputFormatCheck(currentLocation: String, commandsString: String): Boolean = {
    POSITION_VERIFICATION.matches(currentLocation) && COMMAND_VERIFICATION.matches(commandsString)
  }
}