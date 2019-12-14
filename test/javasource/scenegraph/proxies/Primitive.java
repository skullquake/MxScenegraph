// This file was generated by Mendix Modeler.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package scenegraph.proxies;

public class Primitive
{
	private final com.mendix.systemwideinterfaces.core.IMendixObject primitiveMendixObject;

	private final com.mendix.systemwideinterfaces.core.IContext context;

	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "SceneGraph.Primitive";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		Name("Name"),
		x("x"),
		y("y"),
		z("z"),
		rotx("rotx"),
		roty("roty"),
		rotz("rotz"),
		visible("visible"),
		color("color"),
		Primitive_Node("SceneGraph.Primitive_Node"),
		Selected("SceneGraph.Selected"),
		Texture("SceneGraph.Texture");

		private java.lang.String metaName;

		MemberNames(java.lang.String s)
		{
			metaName = s;
		}

		@java.lang.Override
		public java.lang.String toString()
		{
			return metaName;
		}
	}

	public Primitive(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, "SceneGraph.Primitive"));
	}

	protected Primitive(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject primitiveMendixObject)
	{
		if (primitiveMendixObject == null)
			throw new java.lang.IllegalArgumentException("The given object cannot be null.");
		if (!com.mendix.core.Core.isSubClassOf("SceneGraph.Primitive", primitiveMendixObject.getType()))
			throw new java.lang.IllegalArgumentException("The given object is not a SceneGraph.Primitive");

		this.primitiveMendixObject = primitiveMendixObject;
		this.context = context;
	}

	/**
	 * @deprecated Use 'Primitive.load(IContext, IMendixIdentifier)' instead.
	 */
	@java.lang.Deprecated
	public static scenegraph.proxies.Primitive initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		return scenegraph.proxies.Primitive.load(context, mendixIdentifier);
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 */
	public static scenegraph.proxies.Primitive initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		if (com.mendix.core.Core.isSubClassOf("SceneGraph.Box", mendixObject.getType()))
			return scenegraph.proxies.Box.initialize(context, mendixObject);

		if (com.mendix.core.Core.isSubClassOf("SceneGraph.Cylinder", mendixObject.getType()))
			return scenegraph.proxies.Cylinder.initialize(context, mendixObject);

		if (com.mendix.core.Core.isSubClassOf("SceneGraph.Disc", mendixObject.getType()))
			return scenegraph.proxies.Disc.initialize(context, mendixObject);

		if (com.mendix.core.Core.isSubClassOf("SceneGraph.IcoSphere", mendixObject.getType()))
			return scenegraph.proxies.IcoSphere.initialize(context, mendixObject);

		if (com.mendix.core.Core.isSubClassOf("SceneGraph.Lathe", mendixObject.getType()))
			return scenegraph.proxies.Lathe.initialize(context, mendixObject);

		if (com.mendix.core.Core.isSubClassOf("SceneGraph.Line", mendixObject.getType()))
			return scenegraph.proxies.Line.initialize(context, mendixObject);

		if (com.mendix.core.Core.isSubClassOf("SceneGraph.Model", mendixObject.getType()))
			return scenegraph.proxies.Model.initialize(context, mendixObject);

		if (com.mendix.core.Core.isSubClassOf("SceneGraph.Plane", mendixObject.getType()))
			return scenegraph.proxies.Plane.initialize(context, mendixObject);

		if (com.mendix.core.Core.isSubClassOf("SceneGraph.Polygon", mendixObject.getType()))
			return scenegraph.proxies.Polygon.initialize(context, mendixObject);

		if (com.mendix.core.Core.isSubClassOf("SceneGraph.Sphere", mendixObject.getType()))
			return scenegraph.proxies.Sphere.initialize(context, mendixObject);

		if (com.mendix.core.Core.isSubClassOf("SceneGraph.Text", mendixObject.getType()))
			return scenegraph.proxies.Text.initialize(context, mendixObject);

		if (com.mendix.core.Core.isSubClassOf("SceneGraph.Torus", mendixObject.getType()))
			return scenegraph.proxies.Torus.initialize(context, mendixObject);

		if (com.mendix.core.Core.isSubClassOf("SceneGraph.Triangle", mendixObject.getType()))
			return scenegraph.proxies.Triangle.initialize(context, mendixObject);

		return new scenegraph.proxies.Primitive(context, mendixObject);
	}

	public static scenegraph.proxies.Primitive load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return scenegraph.proxies.Primitive.initialize(context, mendixObject);
	}

	public static java.util.List<? extends scenegraph.proxies.Primitive> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		java.util.List<scenegraph.proxies.Primitive> result = new java.util.ArrayList<scenegraph.proxies.Primitive>();
		for (com.mendix.systemwideinterfaces.core.IMendixObject obj : com.mendix.core.Core.retrieveXPathQuery(context, "//SceneGraph.Primitive" + xpathConstraint))
			result.add(scenegraph.proxies.Primitive.initialize(context, obj));
		return result;
	}

	/**
	 * Commit the changes made on this proxy object.
	 */
	public final void commit() throws com.mendix.core.CoreException
	{
		com.mendix.core.Core.commit(context, getMendixObject());
	}

	/**
	 * Commit the changes made on this proxy object using the specified context.
	 */
	public final void commit(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		com.mendix.core.Core.commit(context, getMendixObject());
	}

	/**
	 * Delete the object.
	 */
	public final void delete()
	{
		com.mendix.core.Core.delete(context, getMendixObject());
	}

	/**
	 * Delete the object using the specified context.
	 */
	public final void delete(com.mendix.systemwideinterfaces.core.IContext context)
	{
		com.mendix.core.Core.delete(context, getMendixObject());
	}
	/**
	 * @return value of Name
	 */
	public final java.lang.String getName()
	{
		return getName(getContext());
	}

	/**
	 * @param context
	 * @return value of Name
	 */
	public final java.lang.String getName(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.Name.toString());
	}

	/**
	 * Set value of Name
	 * @param name
	 */
	public final void setName(java.lang.String name)
	{
		setName(getContext(), name);
	}

	/**
	 * Set value of Name
	 * @param context
	 * @param name
	 */
	public final void setName(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String name)
	{
		getMendixObject().setValue(context, MemberNames.Name.toString(), name);
	}

	/**
	 * @return value of x
	 */
	public final java.lang.Double getx()
	{
		return getx(getContext());
	}

	/**
	 * @param context
	 * @return value of x
	 */
	public final java.lang.Double getx(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Double) getMendixObject().getValue(context, MemberNames.x.toString());
	}

	/**
	 * Set value of x
	 * @param x
	 */
	public final void setx(java.lang.Double x)
	{
		setx(getContext(), x);
	}

	/**
	 * Set value of x
	 * @param context
	 * @param x
	 */
	public final void setx(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Double x)
	{
		getMendixObject().setValue(context, MemberNames.x.toString(), x);
	}

	/**
	 * @return value of y
	 */
	public final java.lang.Double gety()
	{
		return gety(getContext());
	}

	/**
	 * @param context
	 * @return value of y
	 */
	public final java.lang.Double gety(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Double) getMendixObject().getValue(context, MemberNames.y.toString());
	}

	/**
	 * Set value of y
	 * @param y
	 */
	public final void sety(java.lang.Double y)
	{
		sety(getContext(), y);
	}

	/**
	 * Set value of y
	 * @param context
	 * @param y
	 */
	public final void sety(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Double y)
	{
		getMendixObject().setValue(context, MemberNames.y.toString(), y);
	}

	/**
	 * @return value of z
	 */
	public final java.lang.Double getz()
	{
		return getz(getContext());
	}

	/**
	 * @param context
	 * @return value of z
	 */
	public final java.lang.Double getz(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Double) getMendixObject().getValue(context, MemberNames.z.toString());
	}

	/**
	 * Set value of z
	 * @param z
	 */
	public final void setz(java.lang.Double z)
	{
		setz(getContext(), z);
	}

	/**
	 * Set value of z
	 * @param context
	 * @param z
	 */
	public final void setz(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Double z)
	{
		getMendixObject().setValue(context, MemberNames.z.toString(), z);
	}

	/**
	 * @return value of rotx
	 */
	public final java.lang.Double getrotx()
	{
		return getrotx(getContext());
	}

	/**
	 * @param context
	 * @return value of rotx
	 */
	public final java.lang.Double getrotx(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Double) getMendixObject().getValue(context, MemberNames.rotx.toString());
	}

	/**
	 * Set value of rotx
	 * @param rotx
	 */
	public final void setrotx(java.lang.Double rotx)
	{
		setrotx(getContext(), rotx);
	}

	/**
	 * Set value of rotx
	 * @param context
	 * @param rotx
	 */
	public final void setrotx(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Double rotx)
	{
		getMendixObject().setValue(context, MemberNames.rotx.toString(), rotx);
	}

	/**
	 * @return value of roty
	 */
	public final java.lang.Double getroty()
	{
		return getroty(getContext());
	}

	/**
	 * @param context
	 * @return value of roty
	 */
	public final java.lang.Double getroty(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Double) getMendixObject().getValue(context, MemberNames.roty.toString());
	}

	/**
	 * Set value of roty
	 * @param roty
	 */
	public final void setroty(java.lang.Double roty)
	{
		setroty(getContext(), roty);
	}

	/**
	 * Set value of roty
	 * @param context
	 * @param roty
	 */
	public final void setroty(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Double roty)
	{
		getMendixObject().setValue(context, MemberNames.roty.toString(), roty);
	}

	/**
	 * @return value of rotz
	 */
	public final java.lang.Double getrotz()
	{
		return getrotz(getContext());
	}

	/**
	 * @param context
	 * @return value of rotz
	 */
	public final java.lang.Double getrotz(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Double) getMendixObject().getValue(context, MemberNames.rotz.toString());
	}

	/**
	 * Set value of rotz
	 * @param rotz
	 */
	public final void setrotz(java.lang.Double rotz)
	{
		setrotz(getContext(), rotz);
	}

	/**
	 * Set value of rotz
	 * @param context
	 * @param rotz
	 */
	public final void setrotz(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Double rotz)
	{
		getMendixObject().setValue(context, MemberNames.rotz.toString(), rotz);
	}

	/**
	 * @return value of visible
	 */
	public final java.lang.Boolean getvisible()
	{
		return getvisible(getContext());
	}

	/**
	 * @param context
	 * @return value of visible
	 */
	public final java.lang.Boolean getvisible(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Boolean) getMendixObject().getValue(context, MemberNames.visible.toString());
	}

	/**
	 * Set value of visible
	 * @param visible
	 */
	public final void setvisible(java.lang.Boolean visible)
	{
		setvisible(getContext(), visible);
	}

	/**
	 * Set value of visible
	 * @param context
	 * @param visible
	 */
	public final void setvisible(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Boolean visible)
	{
		getMendixObject().setValue(context, MemberNames.visible.toString(), visible);
	}

	/**
	 * @return value of color
	 */
	public final java.lang.String getcolor()
	{
		return getcolor(getContext());
	}

	/**
	 * @param context
	 * @return value of color
	 */
	public final java.lang.String getcolor(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.color.toString());
	}

	/**
	 * Set value of color
	 * @param color
	 */
	public final void setcolor(java.lang.String color)
	{
		setcolor(getContext(), color);
	}

	/**
	 * Set value of color
	 * @param context
	 * @param color
	 */
	public final void setcolor(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String color)
	{
		getMendixObject().setValue(context, MemberNames.color.toString(), color);
	}

	/**
	 * @return value of Primitive_Node
	 */
	public final scenegraph.proxies.Node getPrimitive_Node() throws com.mendix.core.CoreException
	{
		return getPrimitive_Node(getContext());
	}

	/**
	 * @param context
	 * @return value of Primitive_Node
	 */
	public final scenegraph.proxies.Node getPrimitive_Node(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		scenegraph.proxies.Node result = null;
		com.mendix.systemwideinterfaces.core.IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.Primitive_Node.toString());
		if (identifier != null)
			result = scenegraph.proxies.Node.load(context, identifier);
		return result;
	}

	/**
	 * Set value of Primitive_Node
	 * @param primitive_node
	 */
	public final void setPrimitive_Node(scenegraph.proxies.Node primitive_node)
	{
		setPrimitive_Node(getContext(), primitive_node);
	}

	/**
	 * Set value of Primitive_Node
	 * @param context
	 * @param primitive_node
	 */
	public final void setPrimitive_Node(com.mendix.systemwideinterfaces.core.IContext context, scenegraph.proxies.Node primitive_node)
	{
		if (primitive_node == null)
			getMendixObject().setValue(context, MemberNames.Primitive_Node.toString(), null);
		else
			getMendixObject().setValue(context, MemberNames.Primitive_Node.toString(), primitive_node.getMendixObject().getId());
	}

	/**
	 * @return value of Selected
	 */
	public final scenegraph.proxies.Scene getSelected() throws com.mendix.core.CoreException
	{
		return getSelected(getContext());
	}

	/**
	 * @param context
	 * @return value of Selected
	 */
	public final scenegraph.proxies.Scene getSelected(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		scenegraph.proxies.Scene result = null;
		com.mendix.systemwideinterfaces.core.IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.Selected.toString());
		if (identifier != null)
			result = scenegraph.proxies.Scene.load(context, identifier);
		return result;
	}

	/**
	 * Set value of Selected
	 * @param selected
	 */
	public final void setSelected(scenegraph.proxies.Scene selected)
	{
		setSelected(getContext(), selected);
	}

	/**
	 * Set value of Selected
	 * @param context
	 * @param selected
	 */
	public final void setSelected(com.mendix.systemwideinterfaces.core.IContext context, scenegraph.proxies.Scene selected)
	{
		if (selected == null)
			getMendixObject().setValue(context, MemberNames.Selected.toString(), null);
		else
			getMendixObject().setValue(context, MemberNames.Selected.toString(), selected.getMendixObject().getId());
	}

	/**
	 * @return value of Texture
	 */
	public final java.util.List<scenegraph.proxies.Image> getTexture() throws com.mendix.core.CoreException
	{
		return getTexture(getContext());
	}

	/**
	 * @param context
	 * @return value of Texture
	 */
	@SuppressWarnings("unchecked")
	public final java.util.List<scenegraph.proxies.Image> getTexture(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		java.util.List<scenegraph.proxies.Image> result = new java.util.ArrayList<scenegraph.proxies.Image>();
		Object valueObject = getMendixObject().getValue(context, MemberNames.Texture.toString());
		if (valueObject == null)
			return result;
		for (com.mendix.systemwideinterfaces.core.IMendixObject mendixObject : com.mendix.core.Core.retrieveIdList(context, (java.util.List<com.mendix.systemwideinterfaces.core.IMendixIdentifier>) valueObject))
			result.add(scenegraph.proxies.Image.initialize(context, mendixObject));
		return result;
	}

	/**
	 * Set value of Texture
	 * @param texture
	 */
	public final void setTexture(java.util.List<scenegraph.proxies.Image> texture)
	{
		setTexture(getContext(), texture);
	}

	/**
	 * Set value of Texture
	 * @param context
	 * @param texture
	 */
	public final void setTexture(com.mendix.systemwideinterfaces.core.IContext context, java.util.List<scenegraph.proxies.Image> texture)
	{
		java.util.List<com.mendix.systemwideinterfaces.core.IMendixIdentifier> identifiers = new java.util.ArrayList<com.mendix.systemwideinterfaces.core.IMendixIdentifier>();
		for (scenegraph.proxies.Image proxyObject : texture)
			identifiers.add(proxyObject.getMendixObject().getId());
		getMendixObject().setValue(context, MemberNames.Texture.toString(), identifiers);
	}

	/**
	 * @return the IMendixObject instance of this proxy for use in the Core interface.
	 */
	public final com.mendix.systemwideinterfaces.core.IMendixObject getMendixObject()
	{
		return primitiveMendixObject;
	}

	/**
	 * @return the IContext instance of this proxy, or null if no IContext instance was specified at initialization.
	 */
	public final com.mendix.systemwideinterfaces.core.IContext getContext()
	{
		return context;
	}

	@java.lang.Override
	public boolean equals(Object obj)
	{
		if (obj == this)
			return true;

		if (obj != null && getClass().equals(obj.getClass()))
		{
			final scenegraph.proxies.Primitive that = (scenegraph.proxies.Primitive) obj;
			return getMendixObject().equals(that.getMendixObject());
		}
		return false;
	}

	@java.lang.Override
	public int hashCode()
	{
		return getMendixObject().hashCode();
	}

	/**
	 * @return String name of this class
	 */
	public static java.lang.String getType()
	{
		return "SceneGraph.Primitive";
	}

	/**
	 * @return String GUID from this object, format: ID_0000000000
	 * @deprecated Use getMendixObject().getId().toLong() to get a unique identifier for this object.
	 */
	@java.lang.Deprecated
	public java.lang.String getGUID()
	{
		return "ID_" + getMendixObject().getId().toLong();
	}
}
