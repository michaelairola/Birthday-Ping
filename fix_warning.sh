#!/bin/bash
sed -i'.js' 's/componentWillMount/componentDidMount/g' node_modules/react-native-searchbar/index.js