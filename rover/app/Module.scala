import com.google.inject.AbstractModule
import play.api.{Configuration, Environment}
import net.codingwell.scalaguice.ScalaModule

/**
 * Sets up custom components for Play.
 *
 * https://www.playframework.com/documentation/latest/ScalaDependencyInjection
 */
class Module(environment: Environment, configuration: Configuration)
  extends AbstractModule
    with ScalaModule {
}
