from dynamic_preferences.types import BooleanPreference
from dynamic_preferences.preferences import Section
from dynamic_preferences.registries import global_preferences_registry

# we create some section objects to link related preferences together

configuration = Section('Confirguration')

# We start with a global preference
@global_preferences_registry.register
class SiteTitle(BooleanPreference):
    section = configuration 
    name = 'prelaunch_mode'
    default = False
