package v1.rover

import javax.inject.Inject
import play.api.routing.SimpleRouter
import play.api.routing.Router.Routes
import play.api.routing.sird._

class RoverRouter @Inject()(controller: RoverController) extends SimpleRouter {

  override def routes: Routes = {
    case GET(p"/location/$location/commands/$commands") =>
      controller.calculateRoverLocation(location, commands)
  }
}
