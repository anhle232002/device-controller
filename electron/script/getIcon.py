#!/usr/bin/env python3
import argparse
import gi
gi.require_version('Gtk', '3.0')
from gi.repository import Gtk
ap = argparse.ArgumentParser()

# Add the arguments to the parser
ap.add_argument('name', type=str,
                    help='A required integer positional argument')
args = vars(ap.parse_args())

# icon_name = input("Icon name (case sensitive): ")
icon_name = args['name']
icon_theme = Gtk.IconTheme.get_default()
icon = icon_theme.lookup_icon(icon_name, 48, 0)
if icon:
    print(icon.get_filename(),end='')
else:
    print("not found")