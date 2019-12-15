// This file was generated by Mendix Modeler.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package scenegraph.proxies;

public class TiledGround extends scenegraph.proxies.Primitive
{
	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "SceneGraph.TiledGround";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		xmin("xmin"),
		zmin("zmin"),
		xmax("xmax"),
		zmax("zmax"),
		subdivisions_w("subdivisions_w"),
		subdivisions_h("subdivisions_h"),
		precision_w("precision_w"),
		precision_h("precision_h"),
		doublesided("doublesided"),
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

	public TiledGround(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, "SceneGraph.TiledGround"));
	}

	protected TiledGround(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject tiledGroundMendixObject)
	{
		super(context, tiledGroundMendixObject);
		if (!com.mendix.core.Core.isSubClassOf("SceneGraph.TiledGround", tiledGroundMendixObject.getType()))
			throw new java.lang.IllegalArgumentException("The given object is not a SceneGraph.TiledGround");
	}

	/**
	 * @deprecated Use 'TiledGround.load(IContext, IMendixIdentifier)' instead.
	 */
	@java.lang.Deprecated
	public static scenegraph.proxies.TiledGround initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		return scenegraph.proxies.TiledGround.load(context, mendixIdentifier);
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 */
	public static scenegraph.proxies.TiledGround initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new scenegraph.proxies.TiledGround(context, mendixObject);
	}

	public static scenegraph.proxies.TiledGround load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return scenegraph.proxies.TiledGround.initialize(context, mendixObject);
	}

	public static java.util.List<scenegraph.proxies.TiledGround> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		java.util.List<scenegraph.proxies.TiledGround> result = new java.util.ArrayList<scenegraph.proxies.TiledGround>();
		for (com.mendix.systemwideinterfaces.core.IMendixObject obj : com.mendix.core.Core.retrieveXPathQuery(context, "//SceneGraph.TiledGround" + xpathConstraint))
			result.add(scenegraph.proxies.TiledGround.initialize(context, obj));
		return result;
	}

	/**
	 * @return value of xmin
	 */
	public final java.lang.Integer getxmin()
	{
		return getxmin(getContext());
	}

	/**
	 * @param context
	 * @return value of xmin
	 */
	public final java.lang.Integer getxmin(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.xmin.toString());
	}

	/**
	 * Set value of xmin
	 * @param xmin
	 */
	public final void setxmin(java.lang.Integer xmin)
	{
		setxmin(getContext(), xmin);
	}

	/**
	 * Set value of xmin
	 * @param context
	 * @param xmin
	 */
	public final void setxmin(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer xmin)
	{
		getMendixObject().setValue(context, MemberNames.xmin.toString(), xmin);
	}

	/**
	 * @return value of zmin
	 */
	public final java.lang.Integer getzmin()
	{
		return getzmin(getContext());
	}

	/**
	 * @param context
	 * @return value of zmin
	 */
	public final java.lang.Integer getzmin(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.zmin.toString());
	}

	/**
	 * Set value of zmin
	 * @param zmin
	 */
	public final void setzmin(java.lang.Integer zmin)
	{
		setzmin(getContext(), zmin);
	}

	/**
	 * Set value of zmin
	 * @param context
	 * @param zmin
	 */
	public final void setzmin(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer zmin)
	{
		getMendixObject().setValue(context, MemberNames.zmin.toString(), zmin);
	}

	/**
	 * @return value of xmax
	 */
	public final java.lang.Integer getxmax()
	{
		return getxmax(getContext());
	}

	/**
	 * @param context
	 * @return value of xmax
	 */
	public final java.lang.Integer getxmax(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.xmax.toString());
	}

	/**
	 * Set value of xmax
	 * @param xmax
	 */
	public final void setxmax(java.lang.Integer xmax)
	{
		setxmax(getContext(), xmax);
	}

	/**
	 * Set value of xmax
	 * @param context
	 * @param xmax
	 */
	public final void setxmax(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer xmax)
	{
		getMendixObject().setValue(context, MemberNames.xmax.toString(), xmax);
	}

	/**
	 * @return value of zmax
	 */
	public final java.lang.Integer getzmax()
	{
		return getzmax(getContext());
	}

	/**
	 * @param context
	 * @return value of zmax
	 */
	public final java.lang.Integer getzmax(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.zmax.toString());
	}

	/**
	 * Set value of zmax
	 * @param zmax
	 */
	public final void setzmax(java.lang.Integer zmax)
	{
		setzmax(getContext(), zmax);
	}

	/**
	 * Set value of zmax
	 * @param context
	 * @param zmax
	 */
	public final void setzmax(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer zmax)
	{
		getMendixObject().setValue(context, MemberNames.zmax.toString(), zmax);
	}

	/**
	 * @return value of subdivisions_w
	 */
	public final java.lang.Integer getsubdivisions_w()
	{
		return getsubdivisions_w(getContext());
	}

	/**
	 * @param context
	 * @return value of subdivisions_w
	 */
	public final java.lang.Integer getsubdivisions_w(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.subdivisions_w.toString());
	}

	/**
	 * Set value of subdivisions_w
	 * @param subdivisions_w
	 */
	public final void setsubdivisions_w(java.lang.Integer subdivisions_w)
	{
		setsubdivisions_w(getContext(), subdivisions_w);
	}

	/**
	 * Set value of subdivisions_w
	 * @param context
	 * @param subdivisions_w
	 */
	public final void setsubdivisions_w(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer subdivisions_w)
	{
		getMendixObject().setValue(context, MemberNames.subdivisions_w.toString(), subdivisions_w);
	}

	/**
	 * @return value of subdivisions_h
	 */
	public final java.lang.Integer getsubdivisions_h()
	{
		return getsubdivisions_h(getContext());
	}

	/**
	 * @param context
	 * @return value of subdivisions_h
	 */
	public final java.lang.Integer getsubdivisions_h(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.subdivisions_h.toString());
	}

	/**
	 * Set value of subdivisions_h
	 * @param subdivisions_h
	 */
	public final void setsubdivisions_h(java.lang.Integer subdivisions_h)
	{
		setsubdivisions_h(getContext(), subdivisions_h);
	}

	/**
	 * Set value of subdivisions_h
	 * @param context
	 * @param subdivisions_h
	 */
	public final void setsubdivisions_h(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer subdivisions_h)
	{
		getMendixObject().setValue(context, MemberNames.subdivisions_h.toString(), subdivisions_h);
	}

	/**
	 * @return value of precision_w
	 */
	public final java.lang.Integer getprecision_w()
	{
		return getprecision_w(getContext());
	}

	/**
	 * @param context
	 * @return value of precision_w
	 */
	public final java.lang.Integer getprecision_w(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.precision_w.toString());
	}

	/**
	 * Set value of precision_w
	 * @param precision_w
	 */
	public final void setprecision_w(java.lang.Integer precision_w)
	{
		setprecision_w(getContext(), precision_w);
	}

	/**
	 * Set value of precision_w
	 * @param context
	 * @param precision_w
	 */
	public final void setprecision_w(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer precision_w)
	{
		getMendixObject().setValue(context, MemberNames.precision_w.toString(), precision_w);
	}

	/**
	 * @return value of precision_h
	 */
	public final java.lang.Integer getprecision_h()
	{
		return getprecision_h(getContext());
	}

	/**
	 * @param context
	 * @return value of precision_h
	 */
	public final java.lang.Integer getprecision_h(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.precision_h.toString());
	}

	/**
	 * Set value of precision_h
	 * @param precision_h
	 */
	public final void setprecision_h(java.lang.Integer precision_h)
	{
		setprecision_h(getContext(), precision_h);
	}

	/**
	 * Set value of precision_h
	 * @param context
	 * @param precision_h
	 */
	public final void setprecision_h(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer precision_h)
	{
		getMendixObject().setValue(context, MemberNames.precision_h.toString(), precision_h);
	}

	/**
	 * @return value of doublesided
	 */
	public final java.lang.Boolean getdoublesided()
	{
		return getdoublesided(getContext());
	}

	/**
	 * @param context
	 * @return value of doublesided
	 */
	public final java.lang.Boolean getdoublesided(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Boolean) getMendixObject().getValue(context, MemberNames.doublesided.toString());
	}

	/**
	 * Set value of doublesided
	 * @param doublesided
	 */
	public final void setdoublesided(java.lang.Boolean doublesided)
	{
		setdoublesided(getContext(), doublesided);
	}

	/**
	 * Set value of doublesided
	 * @param context
	 * @param doublesided
	 */
	public final void setdoublesided(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Boolean doublesided)
	{
		getMendixObject().setValue(context, MemberNames.doublesided.toString(), doublesided);
	}

	@java.lang.Override
	public boolean equals(Object obj)
	{
		if (obj == this)
			return true;

		if (obj != null && getClass().equals(obj.getClass()))
		{
			final scenegraph.proxies.TiledGround that = (scenegraph.proxies.TiledGround) obj;
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
		return "SceneGraph.TiledGround";
	}

	/**
	 * @return String GUID from this object, format: ID_0000000000
	 * @deprecated Use getMendixObject().getId().toLong() to get a unique identifier for this object.
	 */
	@java.lang.Override
	@java.lang.Deprecated
	public java.lang.String getGUID()
	{
		return "ID_" + getMendixObject().getId().toLong();
	}
}
