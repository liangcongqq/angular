'use strict';"use strict";
// Public API for compiler
var component_resolver_1 = require('./linker/component_resolver');
exports.ComponentResolver = component_resolver_1.ComponentResolver;
var query_list_1 = require('./linker/query_list');
exports.QueryList = query_list_1.QueryList;
var dynamic_component_loader_1 = require('./linker/dynamic_component_loader');
exports.DynamicComponentLoader = dynamic_component_loader_1.DynamicComponentLoader;
var element_ref_1 = require('./linker/element_ref');
exports.ElementRef = element_ref_1.ElementRef;
var template_ref_1 = require('./linker/template_ref');
exports.TemplateRef = template_ref_1.TemplateRef;
var view_ref_1 = require('./linker/view_ref');
exports.EmbeddedViewRef = view_ref_1.EmbeddedViewRef;
exports.ViewRef = view_ref_1.ViewRef;
var view_container_ref_1 = require('./linker/view_container_ref');
exports.ViewContainerRef = view_container_ref_1.ViewContainerRef;
var component_factory_1 = require('./linker/component_factory');
exports.ComponentRef = component_factory_1.ComponentRef;
exports.ComponentFactory = component_factory_1.ComponentFactory;
var exceptions_1 = require('./linker/exceptions');
exports.ExpressionChangedAfterItHasBeenCheckedException = exceptions_1.ExpressionChangedAfterItHasBeenCheckedException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC02STdUQmMzMi50bXAvYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwQkFBMEI7QUFDMUIsbUNBQWdDLDZCQUE2QixDQUFDO0FBQXRELG1FQUFzRDtBQUM5RCwyQkFBd0IscUJBQXFCLENBQUM7QUFBdEMsMkNBQXNDO0FBQzlDLHlDQUFxQyxtQ0FBbUMsQ0FBQztBQUFqRSxtRkFBaUU7QUFDekUsNEJBQXlCLHNCQUFzQixDQUFDO0FBQXhDLDhDQUF3QztBQUNoRCw2QkFBMEIsdUJBQXVCLENBQUM7QUFBMUMsaURBQTBDO0FBQ2xELHlCQUF1QyxtQkFBbUIsQ0FBQztBQUFuRCxxREFBZTtBQUFFLHFDQUFrQztBQUMzRCxtQ0FBK0IsNkJBQTZCLENBQUM7QUFBckQsaUVBQXFEO0FBQzdELGtDQUE2Qyw0QkFBNEIsQ0FBQztBQUFsRSx3REFBWTtBQUFFLGdFQUFvRDtBQUMxRSwyQkFBOEQscUJBQXFCLENBQUM7QUFBNUUsdUhBQTRFIiwic291cmNlc0NvbnRlbnQiOlsiLy8gUHVibGljIEFQSSBmb3IgY29tcGlsZXJcbmV4cG9ydCB7Q29tcG9uZW50UmVzb2x2ZXJ9IGZyb20gJy4vbGlua2VyL2NvbXBvbmVudF9yZXNvbHZlcic7XG5leHBvcnQge1F1ZXJ5TGlzdH0gZnJvbSAnLi9saW5rZXIvcXVlcnlfbGlzdCc7XG5leHBvcnQge0R5bmFtaWNDb21wb25lbnRMb2FkZXJ9IGZyb20gJy4vbGlua2VyL2R5bmFtaWNfY29tcG9uZW50X2xvYWRlcic7XG5leHBvcnQge0VsZW1lbnRSZWZ9IGZyb20gJy4vbGlua2VyL2VsZW1lbnRfcmVmJztcbmV4cG9ydCB7VGVtcGxhdGVSZWZ9IGZyb20gJy4vbGlua2VyL3RlbXBsYXRlX3JlZic7XG5leHBvcnQge0VtYmVkZGVkVmlld1JlZiwgVmlld1JlZn0gZnJvbSAnLi9saW5rZXIvdmlld19yZWYnO1xuZXhwb3J0IHtWaWV3Q29udGFpbmVyUmVmfSBmcm9tICcuL2xpbmtlci92aWV3X2NvbnRhaW5lcl9yZWYnO1xuZXhwb3J0IHtDb21wb25lbnRSZWYsIENvbXBvbmVudEZhY3Rvcnl9IGZyb20gJy4vbGlua2VyL2NvbXBvbmVudF9mYWN0b3J5JztcbmV4cG9ydCB7RXhwcmVzc2lvbkNoYW5nZWRBZnRlckl0SGFzQmVlbkNoZWNrZWRFeGNlcHRpb259IGZyb20gJy4vbGlua2VyL2V4Y2VwdGlvbnMnOyJdfQ==