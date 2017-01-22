from setuptools import setup

# The modules required to use this project
requires = [
	'pyramid',
	'pyramid_chameleon',
	'requests',
]

"""
Sets up localpool package when egg-info is made via install -e .

Runs the application off of this egg (which is referenced in the ini file) with:
	$ $VENV/bin/pserve development.ini --reload
in this instance from the ini directory:
	$ ../env/bin/pserve development.ini --reload

[paste.app_factory]
tells pyramid to look in tutorial's __init__.py
for main function (name of func after colon) to run to run app

"""
setup(name='localpool',
      install_requires=requires,
      entry_points="""\
      [paste.app_factory]
      main = localpool:main
      """,
)
