
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProductMeasurementsProps {
  productType: string;
  value: any;
  onChange: (measurements: any) => void;
}

const ProductMeasurements = ({ productType, value, onChange }: ProductMeasurementsProps) => {
  const [measurements, setMeasurements] = useState<any>(value || {});

  useEffect(() => {
    onChange(measurements);
  }, [measurements, onChange]);

  const handleChange = (field: string, fieldValue: string) => {
    setMeasurements({
      ...measurements,
      [field]: fieldValue
    });
  };

  const renderShirtMeasurements = () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label>Neck</Label>
        <Input 
          type="text" 
          value={measurements.neck || ''} 
          onChange={(e) => handleChange('neck', e.target.value)} 
          placeholder="inches"
        />
      </div>
      <div>
        <Label>Chest</Label>
        <Input 
          type="text" 
          value={measurements.chest || ''} 
          onChange={(e) => handleChange('chest', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Waist</Label>
        <Input 
          type="text" 
          value={measurements.waist || ''} 
          onChange={(e) => handleChange('waist', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Shoulder</Label>
        <Input 
          type="text" 
          value={measurements.shoulder || ''} 
          onChange={(e) => handleChange('shoulder', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Sleeve Length</Label>
        <Input 
          type="text" 
          value={measurements.sleeveLength || ''} 
          onChange={(e) => handleChange('sleeveLength', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Shirt Length</Label>
        <Input 
          type="text" 
          value={measurements.shirtLength || ''} 
          onChange={(e) => handleChange('shirtLength', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Cuff</Label>
        <Input 
          type="text" 
          value={measurements.cuff || ''} 
          onChange={(e) => handleChange('cuff', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Notes</Label>
        <Input 
          type="text" 
          value={measurements.notes || ''} 
          onChange={(e) => handleChange('notes', e.target.value)} 
        />
      </div>
    </div>
  );

  const renderPantMeasurements = () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label>Waist</Label>
        <Input 
          type="text" 
          value={measurements.waist || ''} 
          onChange={(e) => handleChange('waist', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Hip</Label>
        <Input 
          type="text" 
          value={measurements.hip || ''} 
          onChange={(e) => handleChange('hip', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Length</Label>
        <Input 
          type="text" 
          value={measurements.length || ''} 
          onChange={(e) => handleChange('length', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Inseam</Label>
        <Input 
          type="text" 
          value={measurements.inseam || ''} 
          onChange={(e) => handleChange('inseam', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Thigh</Label>
        <Input 
          type="text" 
          value={measurements.thigh || ''} 
          onChange={(e) => handleChange('thigh', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Knee</Label>
        <Input 
          type="text" 
          value={measurements.knee || ''} 
          onChange={(e) => handleChange('knee', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Bottom</Label>
        <Input 
          type="text" 
          value={measurements.bottom || ''} 
          onChange={(e) => handleChange('bottom', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Notes</Label>
        <Input 
          type="text" 
          value={measurements.notes || ''} 
          onChange={(e) => handleChange('notes', e.target.value)} 
        />
      </div>
    </div>
  );

  const renderPanjabiMeasurements = () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label>Chest</Label>
        <Input 
          type="text" 
          value={measurements.chest || ''} 
          onChange={(e) => handleChange('chest', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Shoulder</Label>
        <Input 
          type="text" 
          value={measurements.shoulder || ''} 
          onChange={(e) => handleChange('shoulder', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Sleeve Length</Label>
        <Input 
          type="text" 
          value={measurements.sleeveLength || ''} 
          onChange={(e) => handleChange('sleeveLength', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Length</Label>
        <Input 
          type="text" 
          value={measurements.length || ''} 
          onChange={(e) => handleChange('length', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Neck</Label>
        <Input 
          type="text" 
          value={measurements.neck || ''} 
          onChange={(e) => handleChange('neck', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Bottom</Label>
        <Input 
          type="text" 
          value={measurements.bottom || ''} 
          onChange={(e) => handleChange('bottom', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div className="col-span-2">
        <Label>Notes</Label>
        <Input 
          type="text" 
          value={measurements.notes || ''} 
          onChange={(e) => handleChange('notes', e.target.value)} 
        />
      </div>
    </div>
  );

  const renderPayjamaMeasurements = () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label>Waist</Label>
        <Input 
          type="text" 
          value={measurements.waist || ''} 
          onChange={(e) => handleChange('waist', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Hip</Label>
        <Input 
          type="text" 
          value={measurements.hip || ''} 
          onChange={(e) => handleChange('hip', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Length</Label>
        <Input 
          type="text" 
          value={measurements.length || ''} 
          onChange={(e) => handleChange('length', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div>
        <Label>Bottom</Label>
        <Input 
          type="text" 
          value={measurements.bottom || ''} 
          onChange={(e) => handleChange('bottom', e.target.value)}
          placeholder="inches" 
        />
      </div>
      <div className="col-span-2">
        <Label>Notes</Label>
        <Input 
          type="text" 
          value={measurements.notes || ''} 
          onChange={(e) => handleChange('notes', e.target.value)} 
        />
      </div>
    </div>
  );

  // For suit, we need both shirt and pant measurements
  const renderSuitMeasurements = () => (
    <div className="space-y-6">
      <div>
        <h5 className="font-medium mb-3">Jacket Measurements</h5>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Chest</Label>
            <Input 
              type="text" 
              value={measurements.chest || ''} 
              onChange={(e) => handleChange('chest', e.target.value)}
              placeholder="inches" 
            />
          </div>
          <div>
            <Label>Shoulder</Label>
            <Input 
              type="text" 
              value={measurements.shoulder || ''} 
              onChange={(e) => handleChange('shoulder', e.target.value)}
              placeholder="inches" 
            />
          </div>
          <div>
            <Label>Sleeve Length</Label>
            <Input 
              type="text" 
              value={measurements.sleeveLength || ''} 
              onChange={(e) => handleChange('sleeveLength', e.target.value)}
              placeholder="inches" 
            />
          </div>
          <div>
            <Label>Jacket Length</Label>
            <Input 
              type="text" 
              value={measurements.jacketLength || ''} 
              onChange={(e) => handleChange('jacketLength', e.target.value)}
              placeholder="inches" 
            />
          </div>
          <div>
            <Label>Waist</Label>
            <Input 
              type="text" 
              value={measurements.jacketWaist || ''} 
              onChange={(e) => handleChange('jacketWaist', e.target.value)}
              placeholder="inches" 
            />
          </div>
        </div>
      </div>

      <div>
        <h5 className="font-medium mb-3">Pant Measurements</h5>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Waist</Label>
            <Input 
              type="text" 
              value={measurements.waist || ''} 
              onChange={(e) => handleChange('waist', e.target.value)}
              placeholder="inches" 
            />
          </div>
          <div>
            <Label>Hip</Label>
            <Input 
              type="text" 
              value={measurements.hip || ''} 
              onChange={(e) => handleChange('hip', e.target.value)}
              placeholder="inches" 
            />
          </div>
          <div>
            <Label>Length</Label>
            <Input 
              type="text" 
              value={measurements.length || ''} 
              onChange={(e) => handleChange('length', e.target.value)}
              placeholder="inches" 
            />
          </div>
          <div>
            <Label>Inseam</Label>
            <Input 
              type="text" 
              value={measurements.inseam || ''} 
              onChange={(e) => handleChange('inseam', e.target.value)}
              placeholder="inches" 
            />
          </div>
          <div>
            <Label>Thigh</Label>
            <Input 
              type="text" 
              value={measurements.thigh || ''} 
              onChange={(e) => handleChange('thigh', e.target.value)}
              placeholder="inches" 
            />
          </div>
          <div>
            <Label>Bottom</Label>
            <Input 
              type="text" 
              value={measurements.bottom || ''} 
              onChange={(e) => handleChange('bottom', e.target.value)}
              placeholder="inches" 
            />
          </div>
        </div>
      </div>

      {productType === 'suit_3piece' && (
        <div>
          <h5 className="font-medium mb-3">Vest Measurements</h5>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Chest</Label>
              <Input 
                type="text" 
                value={measurements.vestChest || ''} 
                onChange={(e) => handleChange('vestChest', e.target.value)}
                placeholder="inches" 
              />
            </div>
            <div>
              <Label>Length</Label>
              <Input 
                type="text" 
                value={measurements.vestLength || ''} 
                onChange={(e) => handleChange('vestLength', e.target.value)}
                placeholder="inches" 
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <Label>Notes</Label>
        <Input 
          type="text" 
          value={measurements.notes || ''} 
          onChange={(e) => handleChange('notes', e.target.value)} 
        />
      </div>
    </div>
  );

  switch (productType) {
    case 'shirt':
      return renderShirtMeasurements();
    case 'pant':
      return renderPantMeasurements();
    case 'suit_2piece':
    case 'suit_3piece':
      return renderSuitMeasurements();
    case 'panjabi':
      return renderPanjabiMeasurements();
    case 'payjama':
      return renderPayjamaMeasurements();
    default:
      return <p className="text-sm text-gray-500">Please select a product type to see measurements.</p>;
  }
};

export default ProductMeasurements;
