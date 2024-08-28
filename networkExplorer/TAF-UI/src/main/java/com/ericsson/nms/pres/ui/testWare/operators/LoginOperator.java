package com.ericsson.nms.pres.ui.testWare.operators;

public interface LoginOperator {
	final String OPERATION_FAILED = "ERROR";

	String login(String username, String password);
}
