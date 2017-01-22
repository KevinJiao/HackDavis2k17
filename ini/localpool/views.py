from pyramid.view import view_config
from pyramid.response import Response

# The following is a view template to display to user
# Tag adds view handler and associates it with route_name as well as a template .pt IN tutorial
@view_config(route_name='would_you_rather', renderer='would_you_rather.pt')
def would_you_rather(request):

	# return values dictate keys, values for chameleon template
    return {'wyr': 'have arms for legs or legs for arms?'}

# The following is a sample REST call handler
# I testsed it worked with postman POST call to url <localhost:6543/post>
# In the body I put {"item":"test right here"}
@view_config(route_name='post_a_rather', request_method='POST', renderer='json')
def post(request):
	print ("\n\nUsually will post to a database:", request.json["item"], "\n\n")
	return Response(status='201 Created', content_type='application/json; charset=UTF-8')