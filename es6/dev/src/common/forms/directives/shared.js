import { ListWrapper, StringMapWrapper } from 'angular2/src/facade/collection';
import { isBlank, isPresent, looseIdentical, hasConstructor } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import { Validators } from '../validators';
import { DefaultValueAccessor } from './default_value_accessor';
import { NumberValueAccessor } from './number_value_accessor';
import { CheckboxControlValueAccessor } from './checkbox_value_accessor';
import { SelectControlValueAccessor } from './select_control_value_accessor';
import { RadioControlValueAccessor } from './radio_control_value_accessor';
import { normalizeValidator, normalizeAsyncValidator } from './normalize_validator';
export function controlPath(name, parent) {
    var p = ListWrapper.clone(parent.path);
    p.push(name);
    return p;
}
export function setUpControl(control, dir) {
    if (isBlank(control))
        _throwError(dir, "Cannot find control");
    if (isBlank(dir.valueAccessor))
        _throwError(dir, "No value accessor for");
    control.validator = Validators.compose([control.validator, dir.validator]);
    control.asyncValidator = Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
    dir.valueAccessor.writeValue(control.value);
    // view -> model
    dir.valueAccessor.registerOnChange((newValue) => {
        dir.viewToModelUpdate(newValue);
        control.updateValue(newValue, { emitModelToViewChange: false });
        control.markAsDirty();
    });
    // model -> view
    control.registerOnChange((newValue) => dir.valueAccessor.writeValue(newValue));
    // touched
    dir.valueAccessor.registerOnTouched(() => control.markAsTouched());
}
export function setUpControlGroup(control, dir) {
    if (isBlank(control))
        _throwError(dir, "Cannot find control");
    control.validator = Validators.compose([control.validator, dir.validator]);
    control.asyncValidator = Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
}
function _throwError(dir, message) {
    var path = dir.path.join(" -> ");
    throw new BaseException(`${message} '${path}'`);
}
export function composeValidators(validators) {
    return isPresent(validators) ? Validators.compose(validators.map(normalizeValidator)) : null;
}
export function composeAsyncValidators(validators) {
    return isPresent(validators) ? Validators.composeAsync(validators.map(normalizeAsyncValidator)) :
        null;
}
export function isPropertyUpdated(changes, viewModel) {
    if (!StringMapWrapper.contains(changes, "model"))
        return false;
    var change = changes["model"];
    if (change.isFirstChange())
        return true;
    return !looseIdentical(viewModel, change.currentValue);
}
// TODO: vsavkin remove it once https://github.com/angular/angular/issues/3011 is implemented
export function selectValueAccessor(dir, valueAccessors) {
    if (isBlank(valueAccessors))
        return null;
    var defaultAccessor;
    var builtinAccessor;
    var customAccessor;
    valueAccessors.forEach((v) => {
        if (hasConstructor(v, DefaultValueAccessor)) {
            defaultAccessor = v;
        }
        else if (hasConstructor(v, CheckboxControlValueAccessor) ||
            hasConstructor(v, NumberValueAccessor) ||
            hasConstructor(v, SelectControlValueAccessor) ||
            hasConstructor(v, RadioControlValueAccessor)) {
            if (isPresent(builtinAccessor))
                _throwError(dir, "More than one built-in value accessor matches");
            builtinAccessor = v;
        }
        else {
            if (isPresent(customAccessor))
                _throwError(dir, "More than one custom value accessor matches");
            customAccessor = v;
        }
    });
    if (isPresent(customAccessor))
        return customAccessor;
    if (isPresent(builtinAccessor))
        return builtinAccessor;
    if (isPresent(defaultAccessor))
        return defaultAccessor;
    _throwError(dir, "No valid value accessor for");
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC11SWF5UWRmNi50bXAvYW5ndWxhcjIvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL3NoYXJlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FBTyxFQUFDLFdBQVcsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGdDQUFnQztPQUNyRSxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBQyxNQUFNLDBCQUEwQjtPQUNwRixFQUFDLGFBQWEsRUFBbUIsTUFBTSxnQ0FBZ0M7T0FPdkUsRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlO09BRWpDLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwwQkFBMEI7T0FDdEQsRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QjtPQUNwRCxFQUFDLDRCQUE0QixFQUFDLE1BQU0sMkJBQTJCO09BQy9ELEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxpQ0FBaUM7T0FDbkUsRUFBQyx5QkFBeUIsRUFBQyxNQUFNLGdDQUFnQztPQUNqRSxFQUFDLGtCQUFrQixFQUFFLHVCQUF1QixFQUFDLE1BQU0sdUJBQXVCO0FBSWpGLDRCQUE0QixJQUFZLEVBQUUsTUFBd0I7SUFDaEUsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNiLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsNkJBQTZCLE9BQWdCLEVBQUUsR0FBYztJQUMzRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFBQyxXQUFXLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFDOUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FB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QUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7SUFDckQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUN2RCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsZUFBZSxDQUFDO0lBRXZELFdBQVcsQ0FBQyxHQUFHLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztJQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGlzdFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2lzQmxhbmssIGlzUHJlc2VudCwgbG9vc2VJZGVudGljYWwsIGhhc0NvbnN0cnVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuXG5pbXBvcnQge0NvbnRyb2xDb250YWluZXJ9IGZyb20gJy4vY29udHJvbF9jb250YWluZXInO1xuaW1wb3J0IHtOZ0NvbnRyb2x9IGZyb20gJy4vbmdfY29udHJvbCc7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbERpcmVjdGl2ZX0gZnJvbSAnLi9hYnN0cmFjdF9jb250cm9sX2RpcmVjdGl2ZSc7XG5pbXBvcnQge05nQ29udHJvbEdyb3VwfSBmcm9tICcuL25nX2NvbnRyb2xfZ3JvdXAnO1xuaW1wb3J0IHtDb250cm9sLCBDb250cm9sR3JvdXB9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7VmFsaWRhdG9yc30gZnJvbSAnLi4vdmFsaWRhdG9ycyc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtEZWZhdWx0VmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9kZWZhdWx0X3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7TnVtYmVyVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9udW1iZXJfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtDaGVja2JveENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2NoZWNrYm94X3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7U2VsZWN0Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vc2VsZWN0X2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtSYWRpb0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL3JhZGlvX2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtub3JtYWxpemVWYWxpZGF0b3IsIG5vcm1hbGl6ZUFzeW5jVmFsaWRhdG9yfSBmcm9tICcuL25vcm1hbGl6ZV92YWxpZGF0b3InO1xuaW1wb3J0IHtWYWxpZGF0b3JGbiwgQXN5bmNWYWxpZGF0b3JGbn0gZnJvbSAnLi92YWxpZGF0b3JzJztcblxuXG5leHBvcnQgZnVuY3Rpb24gY29udHJvbFBhdGgobmFtZTogc3RyaW5nLCBwYXJlbnQ6IENvbnRyb2xDb250YWluZXIpOiBzdHJpbmdbXSB7XG4gIHZhciBwID0gTGlzdFdyYXBwZXIuY2xvbmUocGFyZW50LnBhdGgpO1xuICBwLnB1c2gobmFtZSk7XG4gIHJldHVybiBwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VXBDb250cm9sKGNvbnRyb2w6IENvbnRyb2wsIGRpcjogTmdDb250cm9sKTogdm9pZCB7XG4gIGlmIChpc0JsYW5rKGNvbnRyb2wpKSBfdGhyb3dFcnJvcihkaXIsIFwiQ2Fubm90IGZpbmQgY29udHJvbFwiKTtcbiAgaWYgKGlzQmxhbmsoZGlyLnZhbHVlQWNjZXNzb3IpKSBfdGhyb3dFcnJvcihkaXIsIFwiTm8gdmFsdWUgYWNjZXNzb3IgZm9yXCIpO1xuXG4gIGNvbnRyb2wudmFsaWRhdG9yID0gVmFsaWRhdG9ycy5jb21wb3NlKFtjb250cm9sLnZhbGlkYXRvciwgZGlyLnZhbGlkYXRvcl0pO1xuICBjb250cm9sLmFzeW5jVmFsaWRhdG9yID0gVmFsaWRhdG9ycy5jb21wb3NlQXN5bmMoW2NvbnRyb2wuYXN5bmNWYWxpZGF0b3IsIGRpci5hc3luY1ZhbGlkYXRvcl0pO1xuICBkaXIudmFsdWVBY2Nlc3Nvci53cml0ZVZhbHVlKGNvbnRyb2wudmFsdWUpO1xuXG4gIC8vIHZpZXcgLT4gbW9kZWxcbiAgZGlyLnZhbHVlQWNjZXNzb3IucmVnaXN0ZXJPbkNoYW5nZSgobmV3VmFsdWU6IGFueSkgPT4ge1xuICAgIGRpci52aWV3VG9Nb2RlbFVwZGF0ZShuZXdWYWx1ZSk7XG4gICAgY29udHJvbC51cGRhdGVWYWx1ZShuZXdWYWx1ZSwge2VtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2V9KTtcbiAgICBjb250cm9sLm1hcmtBc0RpcnR5KCk7XG4gIH0pO1xuXG4gIC8vIG1vZGVsIC0+IHZpZXdcbiAgY29udHJvbC5yZWdpc3Rlck9uQ2hhbmdlKChuZXdWYWx1ZTogYW55KSA9PiBkaXIudmFsdWVBY2Nlc3Nvci53cml0ZVZhbHVlKG5ld1ZhbHVlKSk7XG5cbiAgLy8gdG91Y2hlZFxuICBkaXIudmFsdWVBY2Nlc3Nvci5yZWdpc3Rlck9uVG91Y2hlZCgoKSA9PiBjb250cm9sLm1hcmtBc1RvdWNoZWQoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRVcENvbnRyb2xHcm91cChjb250cm9sOiBDb250cm9sR3JvdXAsIGRpcjogTmdDb250cm9sR3JvdXApIHtcbiAgaWYgKGlzQmxhbmsoY29udHJvbCkpIF90aHJvd0Vycm9yKGRpciwgXCJDYW5ub3QgZmluZCBjb250cm9sXCIpO1xuICBjb250cm9sLnZhbGlkYXRvciA9IFZhbGlkYXRvcnMuY29tcG9zZShbY29udHJvbC52YWxpZGF0b3IsIGRpci52YWxpZGF0b3JdKTtcbiAgY29udHJvbC5hc3luY1ZhbGlkYXRvciA9IFZhbGlkYXRvcnMuY29tcG9zZUFzeW5jKFtjb250cm9sLmFzeW5jVmFsaWRhdG9yLCBkaXIuYXN5bmNWYWxpZGF0b3JdKTtcbn1cblxuZnVuY3Rpb24gX3Rocm93RXJyb3IoZGlyOiBBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUsIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICB2YXIgcGF0aCA9IGRpci5wYXRoLmpvaW4oXCIgLT4gXCIpO1xuICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgJHttZXNzYWdlfSAnJHtwYXRofSdgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2VWYWxpZGF0b3JzKHZhbGlkYXRvcnM6IC8qIEFycmF5PFZhbGlkYXRvcnxGdW5jdGlvbj4gKi8gYW55W10pOiBWYWxpZGF0b3JGbiB7XG4gIHJldHVybiBpc1ByZXNlbnQodmFsaWRhdG9ycykgPyBWYWxpZGF0b3JzLmNvbXBvc2UodmFsaWRhdG9ycy5tYXAobm9ybWFsaXplVmFsaWRhdG9yKSkgOiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZUFzeW5jVmFsaWRhdG9ycyhcbiAgICB2YWxpZGF0b3JzOiAvKiBBcnJheTxWYWxpZGF0b3J8RnVuY3Rpb24+ICovIGFueVtdKTogQXN5bmNWYWxpZGF0b3JGbiB7XG4gIHJldHVybiBpc1ByZXNlbnQodmFsaWRhdG9ycykgPyBWYWxpZGF0b3JzLmNvbXBvc2VBc3luYyh2YWxpZGF0b3JzLm1hcChub3JtYWxpemVBc3luY1ZhbGlkYXRvcikpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb3BlcnR5VXBkYXRlZChjaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogYW55fSwgdmlld01vZGVsOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKCFTdHJpbmdNYXBXcmFwcGVyLmNvbnRhaW5zKGNoYW5nZXMsIFwibW9kZWxcIikpIHJldHVybiBmYWxzZTtcbiAgdmFyIGNoYW5nZSA9IGNoYW5nZXNbXCJtb2RlbFwiXTtcblxuICBpZiAoY2hhbmdlLmlzRmlyc3RDaGFuZ2UoKSkgcmV0dXJuIHRydWU7XG4gIHJldHVybiAhbG9vc2VJZGVudGljYWwodmlld01vZGVsLCBjaGFuZ2UuY3VycmVudFZhbHVlKTtcbn1cblxuLy8gVE9ETzogdnNhdmtpbiByZW1vdmUgaXQgb25jZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8zMDExIGlzIGltcGxlbWVudGVkXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0VmFsdWVBY2Nlc3NvcihkaXI6IE5nQ29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlQWNjZXNzb3JzOiBDb250cm9sVmFsdWVBY2Nlc3NvcltdKTogQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBpZiAoaXNCbGFuayh2YWx1ZUFjY2Vzc29ycykpIHJldHVybiBudWxsO1xuXG4gIHZhciBkZWZhdWx0QWNjZXNzb3I6IENvbnRyb2xWYWx1ZUFjY2Vzc29yO1xuICB2YXIgYnVpbHRpbkFjY2Vzc29yOiBDb250cm9sVmFsdWVBY2Nlc3NvcjtcbiAgdmFyIGN1c3RvbUFjY2Vzc29yOiBDb250cm9sVmFsdWVBY2Nlc3NvcjtcbiAgdmFsdWVBY2Nlc3NvcnMuZm9yRWFjaCgodjogQ29udHJvbFZhbHVlQWNjZXNzb3IpID0+IHtcbiAgICBpZiAoaGFzQ29uc3RydWN0b3IodiwgRGVmYXVsdFZhbHVlQWNjZXNzb3IpKSB7XG4gICAgICBkZWZhdWx0QWNjZXNzb3IgPSB2O1xuXG4gICAgfSBlbHNlIGlmIChoYXNDb25zdHJ1Y3Rvcih2LCBDaGVja2JveENvbnRyb2xWYWx1ZUFjY2Vzc29yKSB8fFxuICAgICAgICAgICAgICAgaGFzQ29uc3RydWN0b3IodiwgTnVtYmVyVmFsdWVBY2Nlc3NvcikgfHxcbiAgICAgICAgICAgICAgIGhhc0NvbnN0cnVjdG9yKHYsIFNlbGVjdENvbnRyb2xWYWx1ZUFjY2Vzc29yKSB8fFxuICAgICAgICAgICAgICAgaGFzQ29uc3RydWN0b3IodiwgUmFkaW9Db250cm9sVmFsdWVBY2Nlc3NvcikpIHtcbiAgICAgIGlmIChpc1ByZXNlbnQoYnVpbHRpbkFjY2Vzc29yKSlcbiAgICAgICAgX3Rocm93RXJyb3IoZGlyLCBcIk1vcmUgdGhhbiBvbmUgYnVpbHQtaW4gdmFsdWUgYWNjZXNzb3IgbWF0Y2hlc1wiKTtcbiAgICAgIGJ1aWx0aW5BY2Nlc3NvciA9IHY7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzUHJlc2VudChjdXN0b21BY2Nlc3NvcikpXG4gICAgICAgIF90aHJvd0Vycm9yKGRpciwgXCJNb3JlIHRoYW4gb25lIGN1c3RvbSB2YWx1ZSBhY2Nlc3NvciBtYXRjaGVzXCIpO1xuICAgICAgY3VzdG9tQWNjZXNzb3IgPSB2O1xuICAgIH1cbiAgfSk7XG5cbiAgaWYgKGlzUHJlc2VudChjdXN0b21BY2Nlc3NvcikpIHJldHVybiBjdXN0b21BY2Nlc3NvcjtcbiAgaWYgKGlzUHJlc2VudChidWlsdGluQWNjZXNzb3IpKSByZXR1cm4gYnVpbHRpbkFjY2Vzc29yO1xuICBpZiAoaXNQcmVzZW50KGRlZmF1bHRBY2Nlc3NvcikpIHJldHVybiBkZWZhdWx0QWNjZXNzb3I7XG5cbiAgX3Rocm93RXJyb3IoZGlyLCBcIk5vIHZhbGlkIHZhbHVlIGFjY2Vzc29yIGZvclwiKTtcbiAgcmV0dXJuIG51bGw7XG59XG4iXX0=