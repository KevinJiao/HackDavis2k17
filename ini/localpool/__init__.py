from pyramid.config import Configurator
from pyramid.response import Response

def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include('pyramid_chameleon')

    # Adds route (/ in this case) and associates a route_name (would_you_rather) with it
    config.add_route('add_routes', '/add_routes') # A View
    config.add_route('find_routes', '/find_routes') # A View
    config.add_route('index', '/') # A View

    config.add_route('post_a_rather', '/post') # A REST Call


    # Adds assets directory (in this case static in tutorial i.e. this package)
    config.add_static_view(name='static', path='localpool:static')

    # Adds the view handlers in /views.py in tutorial package
    config.scan('.views')
    return config.make_wsgi_app()