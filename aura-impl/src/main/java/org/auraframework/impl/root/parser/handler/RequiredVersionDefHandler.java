/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.auraframework.impl.root.parser.handler;

import java.util.Set;

import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;

import org.auraframework.def.RequiredVersionDef;
import org.auraframework.def.RootDefinition;
import org.auraframework.impl.DefinitionAccessImpl;
import org.auraframework.impl.root.RequiredVersionDefImpl;
import org.auraframework.impl.system.DefDescriptorImpl;
import org.auraframework.system.AuraContext.Access;
import org.auraframework.system.Source;
import org.auraframework.throwable.quickfix.InvalidAccessValueException;
import org.auraframework.throwable.quickfix.QuickFixException;
import org.auraframework.util.AuraTextUtil;

import com.google.common.collect.ImmutableSet;

public class RequiredVersionDefHandler<P extends RootDefinition> extends ParentedTagHandler<RequiredVersionDefImpl, P> {

    /**
     * The tag that this Handler handles
     */
    public static final String TAG = "aura:require";
    
    private static final String ATTRIBUTE_NAMESPACE = "namespace";
    private static final String ATTRIBUTE_VERSION = "version";

    private static final Set<String> ALLOWED_ATTRIBUTES = ImmutableSet.of(ATTRIBUTE_NAMESPACE, ATTRIBUTE_VERSION);
	
    private final RequiredVersionDefImpl.Builder builder = new RequiredVersionDefImpl.Builder();
    
    public RequiredVersionDefHandler(RootTagHandler<P> parentHandler, XMLStreamReader xmlReader, Source<?> source) {
    	super(parentHandler, xmlReader, source);
    }
    
	@Override
	protected void handleChildTag() throws XMLStreamException,
			QuickFixException {
		// No child. Do nothing.
	}
	
    @Override
    public Set<String> getAllowedAttributes() {
        return ALLOWED_ATTRIBUTES;
    }

	@Override
	protected void handleChildText() throws XMLStreamException,
			QuickFixException {
		// No child. Do nothing.
	}

	@Override
	public String getHandledTag() {
		return TAG;
	}
	
	@Override
    protected void readAttributes() throws InvalidAccessValueException {
		String namespace = getAttributeValue(ATTRIBUTE_NAMESPACE);
		String version = getAttributeValue(ATTRIBUTE_VERSION);
		if (AuraTextUtil.isNullEmptyOrWhitespace(namespace) 
				|| AuraTextUtil.isNullEmptyOrWhitespace(version)) {
			error("Attribute '%s' and '%s' are required on <%s>", ATTRIBUTE_NAMESPACE, ATTRIBUTE_VERSION, TAG);
		}
		builder.setDescriptor(DefDescriptorImpl.getInstance(namespace, RequiredVersionDef.class));
		// We don't want it GLOBAL since we don't want customers adding these themselves.
		// They will be managed via a UI in the Dev Console.
		builder.setAccess(new DefinitionAccessImpl(builder.descriptor.getNamespace(), Access.PUBLIC.toString()));
		builder.setVersion(version);
	}

	@Override
	protected RequiredVersionDefImpl createDefinition()
			throws QuickFixException {
		return builder.build();
	}
}
