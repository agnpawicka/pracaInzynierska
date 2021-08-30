#!/bin/sh
echo Installing node dependencies:
echo "* jsonschema:"
npm install jsonschema
echo "* http, https"
npm install https
npm install http
echo "* express:"
npm install express
echo "* bootstrap:"
npm install bootstrap
echo "* filesystem:"
npm install fs
echo "* cors:"
npm install cors
echo "* multer:"
npm install multer
echo "* child process"
npm install child_process

echo Installing python dependencies:
echo "* tex2pix"
pip install tex2pix
echo "* pdf2image"
pip install pdf2image
echo "* openCV"
pip install opencv-python
