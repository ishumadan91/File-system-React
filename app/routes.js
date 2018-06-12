import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FileSystemWrapper from './containers/FileSystemWrapper';

export default (
	<Switch>
		<Route exact path="/" component={FileSystemWrapper} />
	</Switch>
);
