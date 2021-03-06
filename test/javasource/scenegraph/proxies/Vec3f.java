// This file was generated by Mendix Modeler.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package scenegraph.proxies;

public class Vec3f
{
	private final com.mendix.systemwideinterfaces.core.IMendixObject vec3fMendixObject;

	private final com.mendix.systemwideinterfaces.core.IContext context;

	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "SceneGraph.Vec3f";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		x("x"),
		y("y"),
		z("z"),
		Vec3f_Lathe("SceneGraph.Vec3f_Lathe"),
		Vec3f_Polygon("SceneGraph.Vec3f_Polygon"),
		Vec3f_Line("SceneGraph.Vec3f_Line"),
		Vec3f_Bezier("SceneGraph.Vec3f_Bezier");

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

	public Vec3f(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, "SceneGraph.Vec3f"));
	}

	protected Vec3f(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject vec3fMendixObject)
	{
		if (vec3fMendixObject == null)
			throw new java.lang.IllegalArgumentException("The given object cannot be null.");
		if (!com.mendix.core.Core.isSubClassOf("SceneGraph.Vec3f", vec3fMendixObject.getType()))
			throw new java.lang.IllegalArgumentException("The given object is not a SceneGraph.Vec3f");

		this.vec3fMendixObject = vec3fMendixObject;
		this.context = context;
	}

	/**
	 * @deprecated Use 'Vec3f.load(IContext, IMendixIdentifier)' instead.
	 */
	@java.lang.Deprecated
	public static scenegraph.proxies.Vec3f initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		return scenegraph.proxies.Vec3f.load(context, mendixIdentifier);
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 */
	public static scenegraph.proxies.Vec3f initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new scenegraph.proxies.Vec3f(context, mendixObject);
	}

	public static scenegraph.proxies.Vec3f load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return scenegraph.proxies.Vec3f.initialize(context, mendixObject);
	}

	public static java.util.List<scenegraph.proxies.Vec3f> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		java.util.List<scenegraph.proxies.Vec3f> result = new java.util.ArrayList<scenegraph.proxies.Vec3f>();
		for (com.mendix.systemwideinterfaces.core.IMendixObject obj : com.mendix.core.Core.retrieveXPathQuery(context, "//SceneGraph.Vec3f" + xpathConstraint))
			result.add(scenegraph.proxies.Vec3f.initialize(context, obj));
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
	 * @return value of Vec3f_Lathe
	 */
	public final scenegraph.proxies.Lathe getVec3f_Lathe() throws com.mendix.core.CoreException
	{
		return getVec3f_Lathe(getContext());
	}

	/**
	 * @param context
	 * @return value of Vec3f_Lathe
	 */
	public final scenegraph.proxies.Lathe getVec3f_Lathe(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		scenegraph.proxies.Lathe result = null;
		com.mendix.systemwideinterfaces.core.IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.Vec3f_Lathe.toString());
		if (identifier != null)
			result = scenegraph.proxies.Lathe.load(context, identifier);
		return result;
	}

	/**
	 * Set value of Vec3f_Lathe
	 * @param vec3f_lathe
	 */
	public final void setVec3f_Lathe(scenegraph.proxies.Lathe vec3f_lathe)
	{
		setVec3f_Lathe(getContext(), vec3f_lathe);
	}

	/**
	 * Set value of Vec3f_Lathe
	 * @param context
	 * @param vec3f_lathe
	 */
	public final void setVec3f_Lathe(com.mendix.systemwideinterfaces.core.IContext context, scenegraph.proxies.Lathe vec3f_lathe)
	{
		if (vec3f_lathe == null)
			getMendixObject().setValue(context, MemberNames.Vec3f_Lathe.toString(), null);
		else
			getMendixObject().setValue(context, MemberNames.Vec3f_Lathe.toString(), vec3f_lathe.getMendixObject().getId());
	}

	/**
	 * @return value of Vec3f_Polygon
	 */
	public final scenegraph.proxies.Polygon getVec3f_Polygon() throws com.mendix.core.CoreException
	{
		return getVec3f_Polygon(getContext());
	}

	/**
	 * @param context
	 * @return value of Vec3f_Polygon
	 */
	public final scenegraph.proxies.Polygon getVec3f_Polygon(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		scenegraph.proxies.Polygon result = null;
		com.mendix.systemwideinterfaces.core.IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.Vec3f_Polygon.toString());
		if (identifier != null)
			result = scenegraph.proxies.Polygon.load(context, identifier);
		return result;
	}

	/**
	 * Set value of Vec3f_Polygon
	 * @param vec3f_polygon
	 */
	public final void setVec3f_Polygon(scenegraph.proxies.Polygon vec3f_polygon)
	{
		setVec3f_Polygon(getContext(), vec3f_polygon);
	}

	/**
	 * Set value of Vec3f_Polygon
	 * @param context
	 * @param vec3f_polygon
	 */
	public final void setVec3f_Polygon(com.mendix.systemwideinterfaces.core.IContext context, scenegraph.proxies.Polygon vec3f_polygon)
	{
		if (vec3f_polygon == null)
			getMendixObject().setValue(context, MemberNames.Vec3f_Polygon.toString(), null);
		else
			getMendixObject().setValue(context, MemberNames.Vec3f_Polygon.toString(), vec3f_polygon.getMendixObject().getId());
	}

	/**
	 * @return value of Vec3f_Line
	 */
	public final scenegraph.proxies.Line getVec3f_Line() throws com.mendix.core.CoreException
	{
		return getVec3f_Line(getContext());
	}

	/**
	 * @param context
	 * @return value of Vec3f_Line
	 */
	public final scenegraph.proxies.Line getVec3f_Line(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		scenegraph.proxies.Line result = null;
		com.mendix.systemwideinterfaces.core.IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.Vec3f_Line.toString());
		if (identifier != null)
			result = scenegraph.proxies.Line.load(context, identifier);
		return result;
	}

	/**
	 * Set value of Vec3f_Line
	 * @param vec3f_line
	 */
	public final void setVec3f_Line(scenegraph.proxies.Line vec3f_line)
	{
		setVec3f_Line(getContext(), vec3f_line);
	}

	/**
	 * Set value of Vec3f_Line
	 * @param context
	 * @param vec3f_line
	 */
	public final void setVec3f_Line(com.mendix.systemwideinterfaces.core.IContext context, scenegraph.proxies.Line vec3f_line)
	{
		if (vec3f_line == null)
			getMendixObject().setValue(context, MemberNames.Vec3f_Line.toString(), null);
		else
			getMendixObject().setValue(context, MemberNames.Vec3f_Line.toString(), vec3f_line.getMendixObject().getId());
	}

	/**
	 * @return value of Vec3f_Bezier
	 */
	public final scenegraph.proxies.Bezier getVec3f_Bezier() throws com.mendix.core.CoreException
	{
		return getVec3f_Bezier(getContext());
	}

	/**
	 * @param context
	 * @return value of Vec3f_Bezier
	 */
	public final scenegraph.proxies.Bezier getVec3f_Bezier(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		scenegraph.proxies.Bezier result = null;
		com.mendix.systemwideinterfaces.core.IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.Vec3f_Bezier.toString());
		if (identifier != null)
			result = scenegraph.proxies.Bezier.load(context, identifier);
		return result;
	}

	/**
	 * Set value of Vec3f_Bezier
	 * @param vec3f_bezier
	 */
	public final void setVec3f_Bezier(scenegraph.proxies.Bezier vec3f_bezier)
	{
		setVec3f_Bezier(getContext(), vec3f_bezier);
	}

	/**
	 * Set value of Vec3f_Bezier
	 * @param context
	 * @param vec3f_bezier
	 */
	public final void setVec3f_Bezier(com.mendix.systemwideinterfaces.core.IContext context, scenegraph.proxies.Bezier vec3f_bezier)
	{
		if (vec3f_bezier == null)
			getMendixObject().setValue(context, MemberNames.Vec3f_Bezier.toString(), null);
		else
			getMendixObject().setValue(context, MemberNames.Vec3f_Bezier.toString(), vec3f_bezier.getMendixObject().getId());
	}

	/**
	 * @return the IMendixObject instance of this proxy for use in the Core interface.
	 */
	public final com.mendix.systemwideinterfaces.core.IMendixObject getMendixObject()
	{
		return vec3fMendixObject;
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
			final scenegraph.proxies.Vec3f that = (scenegraph.proxies.Vec3f) obj;
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
		return "SceneGraph.Vec3f";
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
