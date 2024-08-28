/*------------------------------------------------------------------------------
 *******************************************************************************
 * COPYRIGHT Ericsson 2012
 *
 * The copyright to the computer program(s) herein is the property of
 * Ericsson Inc. The programs may be used and/or copied only with written
 * permission from Ericsson Inc. or in accordance with the terms and
 * conditions stipulated in the agreement/contract under which the
 * program(s) have been supplied.
 *******************************************************************************
 *----------------------------------------------------------------------------*/
package com.ericsson.oss.services.managedObjectService.api;

import java.io.Serializable;
import java.util.Collection;
import java.util.Map;

/**
 * @author eramkoh
 * 
 */
public class ManagedObjectDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	private String fdn;
	private String name;
	private String type;
	private Map<String, Object> attributes;
	private Collection<ManagedObjectDTO> children;
	private short level;
	private Map<String, Collection<PersistenceObjectDTO>> associations;

	/**
	 * @return the level
	 */
	public short getLevel() {
		return level;
	}

	/**
	 * @param level
	 *            the level to set
	 */
	public void setLevel(short level) {
		this.level = level;
	}

	/**
	 * @return the associations
	 */
	public Map<String, Collection<PersistenceObjectDTO>> getAssociations() {
		return associations;
	}

	/**
	 * @param associations
	 *            the associations to set
	 */
	public void setAssociations(
			Map<String, Collection<PersistenceObjectDTO>> associations) {
		this.associations = associations;
	}

	/**
	 * @return the entityAddressInfo
	 */
	public PersistenceObjectDTO getEntityAddressInfo() {
		return entityAddressInfo;
	}

	/**
	 * @param entityAddressInfo
	 *            the entityAddressInfo to set
	 */
	public void setEntityAddressInfo(PersistenceObjectDTO entityAddressInfo) {
		this.entityAddressInfo = entityAddressInfo;
	}

	/**
	 * @return the namespace
	 */
	public String getNamespace() {
		return namespace;
	}

	/**
	 * @param namespace
	 *            the namespace to set
	 */
	public void setNamespace(String namespace) {
		this.namespace = namespace;
	}

	/**
	 * @return the parent
	 */
	public ManagedObjectDTO getParent() {
		return parent;
	}

	/**
	 * @param parent
	 *            the parent to set
	 */
	public void setParent(ManagedObjectDTO parent) {
		this.parent = parent;
	}

	/**
	 * @return the poId
	 */
	public long getPoId() {
		return poId;
	}

	/**
	 * @param poId
	 *            the poId to set
	 */
	public void setPoId(long poId) {
		this.poId = poId;
	}

	/**
	 * @return the version
	 */
	public String getVersion() {
		return version;
	}

	/**
	 * @param version
	 *            the version to set
	 */
	public void setVersion(String version) {
		this.version = version;
	}

	private PersistenceObjectDTO entityAddressInfo;
	private String namespace;
	private ManagedObjectDTO parent;
	private long poId;
	private String version;

	/**
	 * @return the attributes
	 */
	public Map<String, Object> getAttributes() {
		return attributes;
	}

	/**
	 * @param attributes
	 *            the attributes to set
	 */
	public void setAttributes(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	/**
	 * @return the children
	 */
	public Collection<ManagedObjectDTO> getChildren() {
		return children;
	}

	/**
	 * @param children
	 *            the children to set
	 */
	public void setChildren(Collection<ManagedObjectDTO> children) {
		this.children = children;
	}

	/**
	 * @return the fdn
	 */
	public String getFdn() {
		return fdn;
	}

	/**
	 * @param fdn
	 *            the fdn to set
	 */
	public void setFdn(String fdn) {
		this.fdn = fdn;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

}
